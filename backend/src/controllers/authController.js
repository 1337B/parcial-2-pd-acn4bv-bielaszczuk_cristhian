import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findByEmail, createUser } from '../models/userModel.js';

/**
 * Registra un nuevo usuario
 * @route POST /api/auth/register
 */
export async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email y password son requeridos'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email inválido'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'El password debe tener al menos 6 caracteres'
      });
    }

    const existingUser = findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        error: 'El email ya está registrado'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = createUser(email, passwordHash);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Login de usuario
 * @route POST /api/auth/login
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email y password son requeridos'
      });
    }

    const user = findByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Verificar que JWT_SECRET exista
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET no está configurado en .env');
      return res.status(500).json({
        error: 'Error de configuración del servidor'
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
}

