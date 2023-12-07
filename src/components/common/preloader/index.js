import { memo } from "react";
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Preloader() {

  const cn = bem('Preloader');

  return (
    <div className={cn()}>
      Loading...
    </div>
  );
}


export default memo(Preloader);