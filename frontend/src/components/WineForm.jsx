import { useState } from 'react';
import { Label, TextInput, Textarea, Button } from 'flowbite-react';

function WineForm({ initialValues = {}, onSubmit, submitLabel = 'Guardar' }) {
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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialValues.imageUrl || null);
  const [useFileUpload, setUseFileUpload] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImagePreview(null);
      setFormData((prev) => ({ ...prev, imageUrl: '' }));
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, image: 'Por favor selecciona un archivo de imagen válido' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'La imagen debe ser menor a 5MB' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImagePreview(base64String);
      setFormData((prev) => ({ ...prev, imageUrl: base64String }));
      setErrors((prev) => ({ ...prev, image: '' }));
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
    const fileInput = document.getElementById('imageFile');
    if (fileInput) fileInput.value = '';
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.grape.trim()) {
      newErrors.grape = 'La cepa es requerida';
    }

    if (!formData.year) {
      newErrors.year = 'El año es requerido';
    } else {
      const yearNum = parseInt(formData.year, 10);
      const currentYear = new Date().getFullYear();
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
        newErrors.year = `El año debe estar entre 1900 y ${currentYear}`;
      }
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        ...formData,
        year: formData.year ? parseInt(formData.year, 10) : null,
        rating: formData.rating ? parseFloat(formData.rating) : null,
      };

      await onSubmit(dataToSubmit);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div>
        <div className="mb-2 block">
          <Label value="Imagen del vino (opcional)" className="font-medium" />
        </div>

        <div className="mb-3 flex gap-4">
          <button
            type="button"
            onClick={() => setUseFileUpload(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !useFileUpload
                ? 'bg-wine-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={isSubmitting}
          >
            Usar URL
          </button>
          <button
            type="button"
            onClick={() => setUseFileUpload(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              useFileUpload
                ? 'bg-wine-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={isSubmitting}
          >
            Subir archivo
          </button>
        </div>

        {!useFileUpload ? (
          <div>
            <TextInput
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={formData.imageUrl}
              onChange={(e) => {
                handleChange(e);
                setImagePreview(e.target.value);
              }}
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">
              Ingresa la URL de una imagen del vino
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3">
              <label
                htmlFor="imageFile"
                className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-wine-600 hover:bg-wine-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-600">Seleccionar imagen</span>
              </label>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isSubmitting}
                className="hidden"
              />
              {imagePreview && (
                <button
                  type="button"
                  onClick={clearImage}
                  className="px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  Eliminar
                </button>
              )}
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Formatos: JPG, PNG, WEBP. Tamaño máximo: 5MB
            </p>
          </div>
        )}

        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
            <div className="relative w-48 h-48 border-2 border-gray-200 rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Vista previa"
                className="w-full h-full object-cover"
                onError={() => {
                  setImagePreview(null);
                  setErrors((prev) => ({ ...prev, image: 'Error al cargar la imagen' }));
                }}
              />
            </div>
          </div>
        )}
      </div>

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

