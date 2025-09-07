<script lang="ts">
  import { cx } from '@/center/utils'
  import mainStore from '../main-store.svelte'
  import Separator from '../Separator.svelte'

  const C = mainStore.getContext()
</script>

<div class={cx('relative flexcc px2 pt4 sm:pt16 pb8')}>
  <h1
    class={cx('rounded-[30px] relative z-9 p2', {
      'bg-white/10 backdrop-blur-sm': C.config.header.bgImg,
      'backdrop-blur-none!': C.optimizeVisuals,
    })}
  >
    <img
      src={C.config.header.titleImg}
      alt={C.config.title}
      class={cx(
        'max-w-full text-8xl text-white font-serif text-center',
        C.config.header.css.img,
      )}
    />
  </h1>
  {#if C.config.header.bgImg}
    <div class="absolute inset-0 overflow-hidden">
      <img
        src={C.config.header.bgImg}
        class="size-full object-cover"
        alt="Background"
      />
    </div>
  {/if}

  {#if C.config.separators[0] && C.config.separators[0].snapTo === 'next'}
    <div class={'absolute bottom-0 w-full'}>
      <Separator index={0} config={C.config.separators[0]} />
    </div>
  {/if}
</div>
