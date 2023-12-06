import { cn as bem } from '@bem-react/classname';

import './style.css';

function NotFound() {

  const cn = bem('NotFound');

  return (
    <div className={cn()}>
      <div className={cn() + '__text_b'}>
        Ничего не найдено
      </div>
      <span></span>
      <div className={cn() + '__text'}>
        К сожалению данной страницы не существует
      </div>
    </div>
  )
}

export default NotFound;