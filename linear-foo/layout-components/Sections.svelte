<script lang="ts">
  import { cx } from '@/center/utils'
  import mainStore from '../main-store.svelte'

  import Markdown from '../section-components/Markdown.svelte'
  import Team from '../section-components/Team.svelte'
  import Separator from '../Separator.svelte'

  const C = mainStore.getContext()
</script>

{#each C.config.sections as section, i (section.title)}
  {@const nextSeparator = C.config.separators[i + 1]}
  <div
    id={section.id}
    class={cx('relative b-red', {
      'bg-main-400': i % 2 === 1,
      'bg-main-500': i % 2 === 0,
      'z-11': nextSeparator,
    })}
  >
    {#if C.config.separators[i] && !C.config.separators[i].reverse}
      <div
        class={cx({
          'text-main-400': i % 2 === 0,
          'text-main-500': i % 2 === 1,
        })}
      >
        <Separator config={C.config.separators[i]} />
      </div>
    {/if}
    <div
      class={cx(
        'h40px py8 flexcs  b-green relative z-11',
        'text-white font-serif tracking-wider font-thin text-2xl sm:text-4xl uppercase',
        'text-shadow-[0_2px_0_#0005]',
      )}
    >
      <div class={cx(C.config.css.width, 'mx-auto w-full px4 text-center ')}>
        {section.title}
      </div>
    </div>
    <div class={cx(C.config.css.width, 'relative mx-auto py4 px4 z-11')}>
      {#each section.components as compConfig, i (i)}
        {#if compConfig.type === 'Markdown'}
          <Markdown config={compConfig} />
        {:else if compConfig.type === 'Team'}
          <Team config={compConfig} />
        {/if}
      {/each}
    </div>

    {#if nextSeparator && nextSeparator.reverse}
      <div
        class={cx({
          'text-main-400': i % 2 === 0,
          'text-main-500': i % 2 === 1,
        })}
      >
        <Separator config={nextSeparator} />
      </div>
    {/if}
  </div>
{/each}

{#if C.config.separators.length > C.config.sections.length}
  {@const lastSeparator = C.config.separators[C.config.sections.length]}
  <div class="relative bg-main-100 text-main-500">
    <Separator config={lastSeparator!} />
    <div class="absolute inset-0 z-8 bg-[url(./noise20.png)] opacity-50"></div>
    <div class="h-20"></div>
  </div>
{/if}
