import { useEffect, useState } from 'react';

function GrapeLoader({ message = "Cargando...", isLoading = true }) {
  const [progress, setProgress] = useState(0);
  const [grapesFilled, setGrapesFilled] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + 2.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    const grapeInterval = setInterval(() => {
      setGrapesFilled((prev) => {
        if (prev >= 8) return 0;
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(grapeInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-32 h-32 mb-6">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 511.999 511.999"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#C1DC3C"
            d="M266.993,89.128c18.528,40.057,12.571,69.379,7.761,84.2c-3.749,11.55-11.849,14.812-21.348,11.595
            c-13.834-4.684-40.033-17.372-58.575-57.46c-20.44-44.192-0.224-98.538-0.224-98.538S246.553,44.937,266.993,89.128z"
          />

          <g fill="none" stroke="#570029" strokeWidth="3">
            <path d="M403.474,296.028c0-29.443-22.902-53.623-51.825-55.702c3.582-7.365,5.596-15.627,5.596-24.353
              c0-30.803-25.06-55.864-55.864-55.864c-4.559,0-8.988,0.562-13.232,1.597c4.283-23.982,0.552-49.203-11.152-75.205
              c0.168-0.881,0.234-1.796,0.159-2.733c-0.156-1.969-3.322-48.408,41.647-63.926c5.325-1.838,8.152-7.643,6.314-12.968
              s-7.643-8.15-12.968-6.314c-31.497,10.868-44.902,33.473-50.601,50.522c-0.921,2.755-1.671,5.452-2.283,8.05
              c-25.23-28.426-59.829-39.39-61.655-39.953c-5.165-1.591-10.679,1.125-12.563,6.191c-0.885,2.382-21.444,58.875,0.527,106.376
              c4.994,10.796,10.869,20.429,17.528,28.813c-27.533,3.435-48.913,26.968-48.913,55.416c0,8.742,2.022,17.018,5.618,24.393
              c-28.666,2.34-51.282,26.402-51.282,55.66c0,29.259,22.616,53.32,51.281,55.661c-3.595,7.375-5.618,15.652-5.618,24.393
              c0,29.259,22.617,53.32,51.283,55.66c-3.595,7.375-5.618,15.653-5.618,24.394c0,30.802,25.06,55.863,55.863,55.863
              s55.863-25.06,55.863-55.863c0-8.742-2.022-17.019-5.618-24.394c28.667-2.34,51.283-26.402,51.283-55.66
              c0-8.725-2.014-16.988-5.596-24.353C380.572,349.652,403.474,325.472,403.474,296.028z"/>
          </g>

          <g>
            <circle
              cx="255.712" cy="456.137" r="45.665"
              fill={grapesFilled >= 1 ? "#7c2d3e" : "transparent"}
              stroke="#570029" strokeWidth="3"
              className="transition-all duration-500"
            />

            <circle
              cx="255.712" cy="296.031" r="45.665"
              fill={grapesFilled >= 2 ? "#7c2d3e" : "transparent"}
              stroke="#570029" strokeWidth="3"
              className="transition-all duration-500"
            />

            <circle
              cx="347.607" cy="296.031" r="45.665"
              fill={grapesFilled >= 3 ? "#7c2d3e" : "transparent"}
              stroke="#570029" strokeWidth="3"
              className="transition-all duration-500"
            />

            <circle
              cx="164.389" cy="296.031" r="45.665"
              fill={grapesFilled >= 4 ? "#7c2d3e" : "transparent"}
              stroke="#570029" strokeWidth="3"
              className="transition-all duration-500"
            />

            <circle
              cx="301.384" cy="376.084" r="45.665"
              fill={grapesFilled >= 5 ? "#7c2d3e" : "transparent"}
              stroke="#570029" strokeWidth="3"
              className="transition-all duration-500"
            />

            <circle
              cx="210.051" cy="376.084" r="45.665"
              fill={grapesFilled >= 6 ? "#7c2d3e" : "transparent"}
              stroke="#570029" strokeWidth="3"
              className="transition-all duration-500"
            />

            <circle
              cx="301.384" cy="215.978" r="45.665"
              fill={grapesFilled >= 7 ? "#7c2d3e" : "transparent"}
              stroke="#570029" strokeWidth="3"
              className="transition-all duration-500"
            />

            <circle
              cx="210.051" cy="215.978" r="45.665"
              fill={grapesFilled >= 8 ? "#7c2d3e" : "transparent"}
              stroke="#570029" strokeWidth="3"
              className="transition-all duration-500"
            />
          </g>
        </svg>
      </div>

      <p className="text-gray-700 font-medium mb-3">{message}</p>

      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-wine-600 to-wine-800 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-3">
        {progress < 30 && "Analizando características..."}
        {progress >= 30 && progress < 60 && "Consultando base de datos..."}
        {progress >= 60 && progress < 95 && "Generando análisis profesional..."}
        {progress >= 95 && "Finalizando..."}
      </p>
    </div>
  );
}

export default GrapeLoader;

