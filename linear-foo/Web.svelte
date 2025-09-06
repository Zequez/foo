<script lang="ts">
  // import '@/substrates/editor/markdown.css'
  import './markdown.css'
  import { cssVariables, cx } from '@/center/utils'
  import { type WebConfig } from './WebConfig'
  import ConfigurableSeparator from './ConfigurableSeparator.svelte'
  import Markdown from './section-components/Markdown.svelte'
  import Team from './section-components/Team.svelte'

  const { config }: { config: WebConfig } = $props()
  // const defaultConfig from './default-config.ts'

  let optimizedVisuals = false
  let stickyNav = $state<boolean>(false)
  let active = $state(config.sections[0]?.id)

  let SeparatorIcon = $derived(config.nav.separator)

  let navShrink = $state({
    removeSeparators: false,
    decreaseTextSize: false,
    minimizeSpacing: false,
  })

  let navBarShrinkTarget: HTMLDivElement = $state(null!)
  const navBarBaseClass = 'w-full h-full overflow-hidden'
  const navBarShrinkStrategies = [
    'flexcc tracking-wider space-x-4',
    'flexcc tracking-wider space-x-4 no-separator',
    'flexcc tracking-wider space-x-1 no-separator',
    'flexcc tracking-wider space-x-1 no-separator text-sm',
    'flexcc tracking-tight space-x-1 no-separator text-sm',
    'flexcs tracking-tight space-x-1 no-separator text-sm overflow-x-auto!',
  ]

  let prevScreenWidth = window.innerWidth
  function handleWidthChange() {
    const newScreenWidth = window.innerWidth

    if (prevScreenWidth === newScreenWidth) return

    for (let klass of navBarShrinkStrategies) {
      navBarShrinkTarget.setAttribute('class', `${navBarBaseClass} ${klass}`)
      const w = navBarShrinkTarget.offsetWidth
      const scrollW = navBarShrinkTarget.scrollWidth

      if (scrollW <= w) {
        break
      }
    }

    prevScreenWidth = newScreenWidth
  }
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
  onresize={() => {
    handleWidthChange()
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
        'fixed z-100 h12 left-0 w-full',
        'transition-[background-color,box-shadow] transition-duration-500',
        'text-white font-serif text-shadow-[0_1px_0_#0006]',
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
      <div
        class={cx(navBarBaseClass, navBarShrinkStrategies[0])}
        bind:this={navBarShrinkTarget}
      >
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
                'separator text-[9px] flex-shrink-0 relative z-10 text-main-950 block [group-no-separator]:hidden',
                config.nav.css.separator,
              )}
            />
          {/if}
        {/each}
      </div>
    </div>
  {/if}

  <!-- #### HEADER #### -->
  <!-- ################ -->

  <div class={cx('relative flexcc px2 py12')}>
    <h1
      class={cx('rounded-[30px] relative z-9 p2', {
        'bg-white/10 backdrop-blur-sm': config.header.bgImg,
        'backdrop-blur-none!': optimizedVisuals,
      })}
    >
      <img
        src={config.header.titleImg}
        alt={config.title}
        class={cx(
          'max-w-full text-8xl text-white font-serif text-center',
          config.header.css.img,
        )}
      />
    </h1>
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
        {#each section.components as compConfig, i (i)}
          {#if compConfig.type === 'Markdown'}
            <Markdown config={compConfig} />
          {:else if compConfig.type === 'Team'}
            <Team config={compConfig} />
          {/if}
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  :root {
    --font-serif: 'Epunda Slab', serif;
  }

  :global {
    .no-separator .separator {
      display: none !important;
    }
  }
</style>
