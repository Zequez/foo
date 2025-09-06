import type { Component } from 'svelte'

export type WebConfig = {
  title: string
  colors: {
    main: {
      hue: number
      saturation: number
    }
    alt: {
      hue: number
      saturation: number
    }
  }
  css: {
    width: string
  }
  floatingIcons: {
    whatsapp?: string
  }
  nav: {
    show: boolean
    separator: Component
    css: {
      separator: string
    }
  }
  header: {
    bgImg: string
    titleImg: string
    title?: string | undefined
    css: {
      container: string
    }
  }
  sections: Section[]
}

type Section = {
  title: string
  content: string
  id: string
  showOnNavigation: boolean
}
