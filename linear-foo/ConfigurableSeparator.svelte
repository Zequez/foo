<script lang="ts">
  const {
    h,
    shape,
    class: klass,
  }: { h: number; shape: ShapeType; class?: string } = $props()

  type ShapeType = {
    type: 'chevron'
    height: number
  }

  const W = 750

  function createChevronSquare(w: number, h: number, chevH: number) {
    // clamp chevron height so it never inverts past the top
    const maxChev = Math.max(0, Math.min(chevH, h / 2))
    const topY = h / 2 // top of the square (bottom-half begins here)
    const peakY = topY - maxChev // y of chevron peak
    const midX = w / 2

    const d = [
      `M0 ${h}`, // bottom-left
      `L0 ${topY}`, // up left to top-of-square
      `L${midX} ${peakY}`, // to chevron peak (center)
      `L${w} ${topY}`, // to top-of-square at right
      `L${w} ${h}`, // down to bottom-right
      'Z', // close
    ].join(' ')

    return d
  }
</script>

<svg
  class={klass}
  xmlns="http://www.w3.org/2000/svg"
  width={W}
  height={h}
  viewBox="0 0 {W} {h}"
  aria-hidden="true"
  preserveAspectRatio="none"
>
  <!-- Path builds a filled shape:
       - starts bottom-left
       - goes up to top-of-square (y = height/2)
       - goes to chevron peak at center (y = top - chevronHeight)
       - to top-of-square at right
       - back down to bottom-right and close -->
  <path d={createChevronSquare(W, h, shape.height)} fill="currentColor" />
</svg>
