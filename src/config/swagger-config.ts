import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BladeUp Doc',
      version: '1.0.0',
      description: 'API for PESV with multiple modules',
      contact: {
        name: 'Luis Martinez',
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints related to authentication',
      },
      {
        name: 'Users',
        description: 'Endpoints All to Users',
      },
      {
        name: 'Barbers',
        description: 'Endpoints related to barbers',
      },

    ],
    servers: [

      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
  },
  apis: [

    './src/modules/auth/routes/*.ts',
    './src/modules/user/routes/*.ts',
    './src/modules/barber/routes/*.ts',
    './src/modules/servicesBarber/routes/*.ts',
    './src/modules/appointments/routes/*.ts'


  ], // Rutas de los módulos
};

const specs = swaggerJsdoc(options);
export default specs;
