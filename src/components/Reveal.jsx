import useScrollReveal from '../hooks/useScrollReveal'

// Bolalarini sahifa skroll qilinganda yumshoq paydo bo'lish animatsiyasi bilan o'raydi.
// delay — millisekundlarda, ketma-ket elementlarni bir-biridan keyin chiqarish uchun (stagger effekti)
function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, isVisible] = useScrollReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal${isVisible ? ' reveal_visible' : ''}${className ? ' ' + className : ''}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
