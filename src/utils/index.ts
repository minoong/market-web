export const isTouchScreen =
 typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches

export const isValidRange = (value: number, min: number, max: number) => {
 if (value < min) return min
 if (value > max) return max
 return value
}
