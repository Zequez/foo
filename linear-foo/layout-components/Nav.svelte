<script lang="ts">
  import { cx } from '@/center/utils'
  import mainStore from '../main-store.svelte'

  const C = mainStore.getContext()

  let stickyNav = $state<boolean>(false)

  let navBarShrinkTarget: HTMLDivElement = $state(null!)
  const navBarBaseClass = 'w-full h-full overflow-hidden'
  const navBarShrinkStrategies = [
    'flexcc tracking-wider space-x-4',
    'flexcc tracking-wider space-x-4 no-separator',
    'flexcc tracking-wider space-x-1px no-separator',
    'flexcc tracking-wider space-x-1px no-separator text-sm',
    'flexcc tracking-tight space-x-1px no-separator text-sm',
    'flexcs tracking-tight space-x-1px no-separator text-sm overflow-x-auto!',
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

  let SeparatorIcon = $derived(C.config.nav.separator)
</script>

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

{#if C.config.nav.show}
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
          'transition-none': C.optimizeVisuals,
          'sm:translate-y-12': stickyNav,
        },
      )}
    ></div>
    <div class={cx('h12 absolute z-8 w-full top-0 bg-black/10')}></div>
    <div
      class={cx(navBarBaseClass, navBarShrinkStrategies[0])}
      bind:this={navBarShrinkTarget}
    >
      {#each C.config.sections as section, i (section.title)}
        <a
          href="#{section.id}"
          class="uppercase font-bold h-full group flexcc relative z-10"
        >
          <span
            class={cx(
              'px2 py1 rounded-lg group-hover:(bg-white/20 transition-duration-0) transition-colors transition-duration-500',
              {
                'bg-alt-500! text-main-200 text-shadow-none shadow-[0_1px_0_0.5px] shadow-black/40':
                  C.activeSection === section.id,
              },
            )}
          >
            {section.title}
          </span>
        </a>
        {#if i < C.config.sections.length - 1}
          <SeparatorIcon
            class={cx(
              'separator text-[9px] flex-shrink-0 relative z-10 text-main-950 block [group-no-separator]:hidden',
              C.config.nav.css.separator,
            )}
          />
        {/if}
      {/each}
    </div>
  </div>
{/if}
