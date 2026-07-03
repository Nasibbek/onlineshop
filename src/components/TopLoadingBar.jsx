import { useNavigation } from 'react-router-dom'
import './component_style.css'

// Route almashganda (data router 'loading' holatida) sahifa tepasida
// yuguruvchi progress-bar ko'rsatadi — YouTube-uslub
function TopLoadingBar() {
  const navigation = useNavigation()
  const active = navigation.state !== 'idle'

  return (
    <div className={active ? 'top_loading_bar active' : 'top_loading_bar'}>
      <div className="top_loading_bar_fill" />
    </div>
  )
}

export default TopLoadingBar
