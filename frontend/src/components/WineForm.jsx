import { useState } from 'react';
import { Label, TextInput, Textarea, Button } from 'flowbite-react';

function WineForm({ initialValues = {}, onSubmit, submitLabel = 'Guardar' }) {
  // Estado del formulario con valores iniciales
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    winery: initialValues.winery || '',
    grape: initialValues.grape || '',
    year: initialValues.year || '',
    country: initialValues.country || '',
    region: initialValues.region || '',
    place: initialValues.place || '',
    rating: initialValues.rating || '',
    aromas: initialValues.aromas || '',
    flavors: initialValues.flavors || '',
    notes: initialValues.notes || '',
    imageUrl: initialValues.imageUrl || '',
  });

  // Estado para errores de validacion
  const [errors, setErrors] = useState({});

  // Estado de carga durante submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo al modificarlo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validar formulario
  const validate = () => {
    const newErrors = {};

    // Nombre requerido
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    // Cepa requerida
    if (!formData.grape.trim()) {
      newErrors.grape = 'La cepa es requerida';
    }

    // Año requerido y validacion
    if (!formData.year) {
      newErrors.year = 'El año es requerido';
    } else {
      const yearNum = parseInt(formData.year, 10);
      const currentYear = new Date().getFullYear();
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
        newErrors.year = `El año debe estar entre 1900 y ${currentYear}`;
      }
    }

    // Rating requerido y validacion
    if (!formData.rating) {
      newErrors.rating = 'La calificacion es requerida';
    } else {
      const ratingNum = parseFloat(formData.rating);
      if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
        newErrors.rating = 'La calificacion debe estar entre 0 y 5';
      }
    }

    return newErrors;
  };

  // Manejar submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Limpiar errores
    setErrors({});
    setIsSubmitting(true);

    try {
      // Preparar datos (convertir year y rating a numeros)
      const dataToSubmit = {
        ...formData,
        year: formData.year ? parseInt(formData.year, 10) : null,
        rating: formData.rating ? parseFloat(formData.rating) : null,
      };

      // Llamar al callback onSubmit
      await onSubmit(dataToSubmit);
    } catch (error) {
      console.error('Error submitting form:', error);
      // El error se maneja en el padre (WineFormPage)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre - Requerido */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Nombre del vino" className="font-medium" />
          <span className="text-red-600 ml-1">*</span>
        </div>
        <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="Ej: Catena Zapata Malbec"
          value={formData.name}
          onChange={handleChange}
          color={errors.name ? 'failure' : 'gray'}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Bodega */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="winery" value="Bodega" className="font-medium" />
        </div>
        <TextInput
          id="winery"
          name="winery"
          type="text"
          placeholder="Ej: Catena Zapata"
          value={formData.winery}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      {/* Cepa - Requerida */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="grape" value="Cepa" className="font-medium" />
          <span className="text-red-600 ml-1">*</span>
        </div>
        <TextInput
          id="grape"
          name="grape"
          type="text"
          placeholder="Ej: Malbec, Cabernet Sauvignon"
          value={formData.grape}
          onChange={handleChange}
          color={errors.grape ? 'failure' : 'gray'}
          disabled={isSubmitting}
        />
        {errors.grape && (
          <p className="mt-1 text-sm text-red-600">{errors.grape}</p>
        )}
      </div>

      {/* Año y Rating en una fila */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Año - Requerido */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="year" value="Año" className="font-medium" />
            <span className="text-red-600 ml-1">*</span>
          </div>
          <TextInput
            id="year"
            name="year"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            placeholder="2020"
            value={formData.year}
            onChange={handleChange}
            color={errors.year ? 'failure' : 'gray'}
            disabled={isSubmitting}
          />
          {errors.year && (
            <p className="mt-1 text-sm text-red-600">{errors.year}</p>
          )}
        </div>

        {/* Rating - Requerido */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="rating" value="Calificacion (0-5)" className="font-medium" />
            <span className="text-red-600 ml-1">*</span>
          </div>
          <TextInput
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            placeholder="4.5"
            value={formData.rating}
            onChange={handleChange}
            color={errors.rating ? 'failure' : 'gray'}
            disabled={isSubmitting}
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>
      </div>

      {/* Pais y Region en una fila */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pais */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="country" value="Pais" className="font-medium" />
          </div>
          <TextInput
            id="country"
            name="country"
            type="text"
            placeholder="Ej: Argentina"
            value={formData.country}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        {/* Region */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="region" value="Region" className="font-medium" />
          </div>
          <TextInput
            id="region"
            name="region"
            type="text"
            placeholder="Ej: Mendoza"
            value={formData.region}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Lugar */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="place" value="Lugar de compra/degustacion" className="font-medium" />
        </div>
        <TextInput
          id="place"
          name="place"
          type="text"
          placeholder="Ej: Bodega Catena Zapata"
          value={formData.place}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      {/* Aromas */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="aromas" value="Aromas" className="font-medium" />
        </div>
        <Textarea
          id="aromas"
          name="aromas"
          rows={3}
          placeholder="Ej: Frutas rojas maduras, vainilla, especias..."
          value={formData.aromas}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      {/* Sabores */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="flavors" value="Sabores" className="font-medium" />
        </div>
        <Textarea
          id="flavors"
          name="flavors"
          rows={3}
          placeholder="Ej: Ciruela madura, chocolate, cafe tostado..."
          value={formData.flavors}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      {/* Notas personales */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="notes" value="Notas personales" className="font-medium" />
        </div>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Tus comentarios sobre este vino..."
          value={formData.notes}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      {/* URL de imagen */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="imageUrl" value="URL de imagen" className="font-medium" />
        </div>
        <TextInput
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
          value={formData.imageUrl}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <p className="mt-1 text-xs text-gray-500">
          Opcional: URL de una imagen del vino
        </p>
      </div>

      {/* Boton de submit */}
      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          isProcessing={isSubmitting}
          className="bg-wine-700 hover:bg-wine-800"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default WineForm;

