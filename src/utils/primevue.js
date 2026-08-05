import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const AppPreset = definePreset(Aura, {
  primitive: {
    brand: {
      50: '#eef5ff',
      100: '#d9e7ff',
      200: '#bcd4ff',
      300: '#8fb8ff',
      400: '#5a90ff',
      500: '#2f6bff',
      600: '#1a4de6',
      700: '#163cbf',
      800: '#17359c',
      900: '#19327c',
      950: '#101f4b'
    }
  },

  semantic: {
    primary: {
      50: '{brand.50}',
      100: '{brand.100}',
      200: '{brand.200}',
      300: '{brand.300}',
      400: '{brand.400}',
      500: '{brand.500}',
      600: '{brand.600}',
      700: '{brand.700}',
      800: '{brand.800}',
      900: '{brand.900}',
      950: '{brand.950}'
    },

    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px'
    },

    focusRing: {
      width: '2px',
      style: 'solid',
      color: '{primary.color}',
      offset: '2px'
    },

    colorScheme: {
      light: {
        primary: {
          color: '{brand.600}',
          contrastColor: '#ffffff',
          hoverColor: '{brand.700}',
          activeColor: '{brand.800}'
        },
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        }
      },
      dark: {
        primary: {
          color: '{brand.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{brand.300}',
          activeColor: '{brand.200}'
        },
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        }
      }
    }
  },

  components: {
    button: {
      root: {
        borderRadius: '{border.radius.md}',
        paddingX: '1rem',
        paddingY: '0.5rem',
        label: {
          fontWeight: '600'
        }
      }
    },
    card: {
      root: {
        borderRadius: '{border.radius.lg}'
      }
    }
  }
});

export default AppPreset;
