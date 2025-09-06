import type { Component } from 'svelte'
import { type Config as TeamConfig } from './section-components/Team.svelte'
import { type Config as MarkdownConfig } from './section-components/Markdown.svelte'

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
      img: string
    }
  }
  sections: Section[]
}

export type SectionComponent = TeamConfig | MarkdownConfig

type Section = {
  title: string
  components: SectionComponent[]
  id: string
  showOnNavigation: boolean
}
