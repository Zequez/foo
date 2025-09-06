import defineConfig from './linear-foo/define-config'
import title from './title.png'
import titleBg from './title-bg.png'
import SeparatorIcon from '~icons/fa6-solid/leaf'

export default defineConfig({
  title: 'Foo Ipsum',
  colors: {
    main: {
      hue: 130,
      saturation: 40,
    },
    alt: {
      hue: 45,
      saturation: 75,
    },
  },
  css: {
    width: 'max-w-screen-md',
  },
  nav: {
    show: true,
    separator: SeparatorIcon,
    css: {
      separator: 'rotate-110',
    },
  },
  header: {
    bgImg: titleBg,
    titleImg: title,
    // css: {
    //   container: 'h400px',
    // },
  },
  sections: [
    {
      title: 'Equipo',
      id: 'equipo',
      showOnNavigation: true,
      hideSeparator: false,
      components: [{ type: 'Markdown', content: 'Equipo!' }],
    },
    {
      title: 'Lugar',
      id: 'donde',
      showOnNavigation: true,
      hideSeparator: false,
      components: [{ type: 'Markdown', content: 'EL LUGAR!' }],
    },
    {
      title: 'Servicios',
      id: 'servicios',
      showOnNavigation: true,
      hideSeparator: false,
      components: [{ type: 'Markdown', content: 'Los servicios!' }],
    },
    {
      title: 'Trabajos',
      id: 'trabajos',
      showOnNavigation: true,
      hideSeparator: false,
      components: [{ type: 'Markdown', content: 'TRABAJOS!' }],
    },
    {
      title: 'Contacto',
      id: 'contacto',
      showOnNavigation: true,
      hideSeparator: false,
      components: [{ type: 'Markdown', content: 'Contacto!' }],
    },
  ],
})
