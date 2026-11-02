'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { PortfolioImage } from '@/lib/portfolio';

export default function ProjectGallery({ images, title, kind, caption }: {
  images: PortfolioImage[]; title: string; kind: 'mobile' | 'desktop'; caption: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    if (!element) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!element.open) element.showModal();
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      if (element.open) element.close();
    };
  }, [isOpen]);
  const move = (direction: number) => setSelected(current => current === null ? null : (current + direction + images.length) % images.length);
  return (
    <figure className={`project-gallery gallery-${kind} gallery-count-${images.length}`}>
      <div className="gallery-grid">{images.map((image, index) => <div className="gallery-item" key={image.src}>
        <button className="image-button" onClick={() => setSelected(index)} aria-label={`Enlarge ${title}: ${image.label}`}>
          <Image src={image.src} alt={image.alt} quality={image.quality} width={image.width} height={image.height} sizes={kind === 'mobile' ? '(max-width: 600px) 70vw, 260px' : '(max-width: 700px) 90vw, 850px'} />
          <span className="enlarge-icon" aria-hidden="true"><Maximize2 size={15} /></span>
        </button><p className="image-label">{image.label}</p>
      </div>)}</div>
      <figcaption>{caption}</figcaption>
      <dialog className="image-dialog" ref={dialog} aria-label={`${title} image viewer`} onCancel={() => setSelected(null)} onClick={event => { if (event.target === dialog.current) setSelected(null); }} onKeyDown={event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      }}>
        {selected !== null && <div className="dialog-content">
          <header><p>{title}<span>{images[selected].label}</span></p><button ref={closeButton} className="dialog-close" onClick={() => setSelected(null)} aria-label="Close image viewer"><X size={22} /></button></header>
          <div className="dialog-image"><Image unoptimized src={images[selected].src} alt={images[selected].alt} width={images[selected].width} height={images[selected].height} /></div>
          <footer><button onClick={() => move(-1)} disabled={images.length < 2} aria-label="Previous image"><ArrowLeft size={20} /></button><span>{selected + 1} / {images.length}</span><button onClick={() => move(1)} disabled={images.length < 2} aria-label="Next image"><ArrowRight size={20} /></button></footer>
        </div>}
      </dialog>
    </figure>
  );
}
