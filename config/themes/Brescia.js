import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import Lara from '@primevue/themes/lara';
import Nora from '@primevue/themes/nora';

const Brescia = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
    },
  },
  semantic: {
    formField: {
      paddingX: '0.75rem',
      paddingY: '0.5rem',
      borderRadius: '{border.radius.xs}',
      focusRing: {
        width: '2px',
        style: 'solid',
        color: '{primary.color}',
        offset: '-1px',
        shadow: 'none',
      },
      transitionDuration: '{transition.duration}',
    },
    transitionDuration: '0s',
    primary: {
      50: '{yellow.50}',
      100: '{yellow.100}',
      200: '{yellow.200}',
      300: '{yellow.300}',
      400: '{yellow.400}',
      500: '{yellow.500}',
      600: '{yellow.600}',
      700: '{yellow.700}',
      800: '{yellow.800}',
      900: '{yellow.900}',
      950: '{yellow.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
        },
      },
      dark: {
        content: {
          background: '{zinc.900}',
        },
        formField: {
          background: '{surface.900}',
        },
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
        },
      },
    },
  },
  components: {
    avatar: {
      width: '1.5rem',
      height: '1.5rem',
      fontSize: '0.75rem',
      lg: {
        width: '2rem',
        height: '2rem',
        fontSize: '1rem',
      },
      xl: {
        width: '3rem',
        height: '3rem',
        fontSize: '1.5rem',
      },
    },
    button: {
      borderRadius: '{border.radius.xs}',
      // borderRadius: '{border.radius.md}',
      sm: {
        paddingX: '.75rem',
        paddingY: '.5rem',
        fontSize: '.75rem',
      },
      label: {
        fontWeight: '500',
      },
      colorScheme: {
        light: {
          outlined: {
            secondary: {
              color: '{surface.900}',
            },
          },
          text: {
            secondary: {
              hoverBackground: '{surface.100}',
              activeBackground: '{surface.200}',
              color: '{surface.900}',
            },
          },
        },
        dark: {
          outlined: {
            secondary: {
              color: '{surface.100}',
            },
          },
          text: {
            secondary: {
              color: '{surface.100}',
            },
          },
        },
      },
    },
    dialog: {
      root: {
        borderRadius: '{border.radius.sm}',
      },
      header: {
        padding: '.5rem 1rem',
      },
      title: {
        fontSize: '1.125rem',
      },
      content: {
        padding: '1rem',
      },
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
            borderColor: '{surface.300}',
          },
        },
        dark: {
          root: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
          },
        },
      },
    },
    drawer: {
      colorScheme: {
        light: {
          root: {
            borderColor: '{surface.0}',
          },
        },
        dark: {
          root: {
            borderColor: '{surface.900}',
          },
        },
      },
    },
    checkbox: {
      root: {
        borderRadius: '2px',
      },
    },
    card: {
      borderRadius: '{border.radius.xs}',
      body: {
        padding: '1rem',
      },
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
          },
        },
        dark: {
          root: {
            background: '{surface.950}',
          },
        },
      },
    },
    divider: {
      colorScheme: {
        light: {
          root: {
            borderColor: '{surface.300}',
          },
        },
        dark: {
          root: {
            borderColor: '{surface.700}',
          },
        },
      },
    },
    paginator: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
          },
        },
        dark: {
          root: {
            background: '{surface.950}',
          },
        },
      },
    },
  },
});

export default {
  preset: Brescia,
  options: {
    darkModeSelector: '.dark',
  },
};
