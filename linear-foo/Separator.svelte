<script lang="ts">
  const separators = import.meta.glob('./separators/*.svg', {
    eager: true,
    as: 'raw',
  }) as { [key: string]: string }

  type SeparatorConfig = {
    id: string
    reverse?: boolean
    flip?: boolean
    dragInOffset?: number
    cavityOffset?: number
    viewboxShift?: [number, number, number, number]
  }

  const { config }: { config: SeparatorConfig } = $props()

  const svg = $derived.by(() => {
    if (!separators[`./separators/${config.id}.svg`]) {
      throw `No SVG named ${config.id} on library`
    }

    return separators[`./separators/${config.id}.svg`]
  })

  const originalViewbox = $derived.by(() => {
    const m = svg.match(/viewBox="([^"]+)"/)
    return m![1].split(' ').map((v) => parseFloat(v)) as [
      number,
      number,
      number,
      number,
    ]
  })

  const shiftedViewbox = $derived.by(() => {
    if (!config.viewboxShift) return originalViewbox
    const base = [
      originalViewbox[2],
      originalViewbox[3],
      originalViewbox[2],
      originalViewbox[3],
    ]
    return config.viewboxShift.map(
      (v, i) => originalViewbox[i] + base[i] * (v / 100),
    )
  })

  const adjustedSvg = $derived.by(() => {
    if (!config.viewboxShift) return svg

    return svg.replace(
      /viewBox="([^"]+)"/,
      `viewBox="${shiftedViewbox.join(' ')}"`,
    )
  })

  let dragInOffset = $derived(config.dragInOffset || 0)
  let reverse = $derived(config.reverse != null ? config.reverse : false)
  let flip = $derived(config.flip != null ? config.flip : false)

  const viewBoxSize = $derived({
    w: shiftedViewbox[2],
    h: shiftedViewbox[3],
  })

  const cavityOffset = $derived.by(() => {
    if (config.cavityOffset != null) return config.cavityOffset
    if (!svg) return null
    const m = svg.match(/data\-offset="(\d+)"/)
    if (!m) return 0
    return parseInt(m[1]) / 100
  })

  const paddingTop = $derived(
    (((1 - cavityOffset!) * viewBoxSize!.h) / viewBoxSize!.w) * 100,
  )

  console.log('ars')
</script>

{#if svg && viewBoxSize && cavityOffset != null}
  <div class="w-full relative b-yellow z-10">
    <div
      class="absolute w-full"
      style={`transform: translateY(${config.reverse ? -(1 - cavityOffset) * dragInOffset * 100 : -cavityOffset! * 100}%) ${reverse ? 'scaleY(-1)' : 'scaleY(1)'} ${flip ? 'scaleX(-1)' : 'scaleX(1)'}`}
    >
      {@html adjustedSvg}
    </div>
    <div
      class="w-full"
      style="padding-top: {paddingTop * (1 - dragInOffset)}%;"
    ></div>
  </div>
{:else}
  <div
    class="h20 w-full bg-red-300 b-5 b-dashed b-red-400 text-white flexcc text-2xl"
  >
    ERROR: No SVG named {config.id} on library
  </div>
{/if}
