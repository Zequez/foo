<script lang="ts">
  // import '@/substrates/editor/markdown.css'
  import './markdown.css'
  import { cssVariables, cx } from '@/center/utils'
  import { type WebConfig } from './WebConfig'
  import ConfigurableSeparator from './ConfigurableSeparator.svelte'
  import { Markdown } from 'svelte-rune-markdown'

  const { config }: { config: WebConfig } = $props()
  // const defaultConfig from './default-config.ts'

  let optimizedVisuals = false
  let stickyNav = $state<boolean>(false)
  let active = $state(config.sections[0]?.id)

  let SeparatorIcon = $derived(config.nav.separator)
</script>

<svelte:head>
  <title>{config.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Epunda+Slab:ital,wght@0,300..900;1,300..900&display=swap"
    rel="stylesheet"
  />
  <meta
    name="theme-color"
    content={`hsl(var(--main-hue) var(--main-saturation) 50%)`}
  />
</svelte:head>

<svelte:window
  onscroll={(ev) => {
    if (stickyNav && window.scrollY === 0) {
      stickyNav = false
    } else if (!stickyNav && window.scrollY > 0) {
      stickyNav = true
    }
  }}
/>

<svelte:body
  use:cssVariables={{
    'main-hue': config.colors.main.hue,
    'main-saturation': config.colors.main.saturation,
    'alt-hue': config.colors.alt.hue,
    'alt-saturation': config.colors.alt.saturation,
  }}
/>

<div
  class="w-full min-h-full bg-main-500"
  style={`background-image: url(./noise20.png);`}
>
  <!-- #### NAV #### -->
  <!-- ############# -->

  {#if config.nav.show}
    <div
      class={cx(
        'transition-[background-color,box-shadow] transition-duration-500 fixed left-0 w-full z-100 h12 flexcc text-white font-serif tracking-wider text-shadow-[0_1px_0_#0006] space-x-4',
        'bottom-0 sm:top-0',
      )}
    >
      <div
        class={cx(
          'h12 absolute z-9 w-full bg-main-200 bg-[url(./noise20.png)] transition-transform',
          'top-0 sm:(-top-12)',
          {
            'transition-none': optimizedVisuals,
            'sm:translate-y-12': stickyNav,
          },
        )}
      ></div>
      <!-- <div class={cx('h12 absolute z-8 w-full top-0 bg-white/10')}></div> -->
      {#each config.sections as section, i (section.title)}
        <a
          href="#{section.id}"
          class="uppercase font-bold h-full group flexcc relative z-10"
        >
          <span
            class={cx(
              'px2 py1 rounded-lg group-hover:(bg-white/20 transition-duration-0) transition-colors transition-duration-500',
              {
                'bg-alt-500! text-main-200 text-shadow-none shadow-[0_1px_0_0.5px] shadow-black/40':
                  active === section.id,
              },
            )}
          >
            {section.title}
          </span>
        </a>
        {#if i < config.sections.length - 1}
          <SeparatorIcon
            class={cx(
              'text-[9px] relative z-10 text-main-950 hidden sm:block',
              config.nav.css.separator,
            )}
          />
        {/if}
      {/each}
    </div>
  {/if}

  <!-- #### HEADER #### -->
  <!-- ################ -->

  <div class={cx('relative', config.header.css.container)}>
    <div class="max-w-3xl mx-auto h-full flexcc">
      <h1
        class={cx('rounded-[30px] relative z-9', {
          'bg-white/10 backdrop-blur-sm': config.header.bgImg,
          'backdrop-blur-none!': optimizedVisuals,
        })}
      >
        <img
          src={config.header.titleImg}
          alt={config.title}
          class="max-w-100 text-8xl text-white font-serif text-center"
          width="500"
          height="333"
        />
      </h1>
    </div>
    {#if config.header.bgImg}
      <div class="absolute inset-0 overflow-hidden">
        <img
          src={config.header.bgImg}
          class="size-full object-cover"
          alt="Background"
        />
      </div>
    {/if}
  </div>

  <!-- #### SECTIONS #### -->
  <!-- ################## -->

  <!-- <ConfigurableSeparator
    class="w-full -mt-30px relative z-100 text-main-900 "
    h={60}
    shape={{ type: 'chevron', height: 30 }}
  /> -->

  {#each config.sections as section, i (section.title)}
    <div id={section.id}>
      <div
        class={cx(
          'h40px b-y-5 b-main-900 uppercase text-serif text-white font-serif tracking-widest text-2xl py8 font-thin flexcs',
          { 'bg-main-400': i % 2 === 0, 'bg-main-300': i % 2 === 1 },
        )}
      >
        <!-- style={`background-image: url(${pattern});`} -->
        <div class={cx(config.css.width, 'mx-auto w-full px4')}>
          {section.title}
        </div>
      </div>
      <div class={cx(config.css.width, 'mx-auto py4 px4 md')}>
        <Markdown content={section.content} />
      </div>
    </div>
  {/each}
</div>

<style global>
  :root {
    --font-serif: 'Epunda Slab', serif;
  }
</style>
