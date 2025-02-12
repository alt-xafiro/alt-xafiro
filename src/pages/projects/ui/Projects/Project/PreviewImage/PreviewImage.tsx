import clsx from 'clsx';

import Image from 'next/image';

import { CustomComponentProps } from '@shared/lib';

import { ProjectData } from '../../../../model/projects';

type PreviewImageProps = CustomComponentProps & {
  data: ProjectData;
  alt: string;
};

export function PreviewImage({ className, data, alt }: PreviewImageProps) {
  return (
    <Image
      className={clsx(
        className,
        'h-auto w-full object-cover',
        data.centeredPreviewImage ? 'object-center' : 'object-top',
        data.id === 'alt-xafiro' && 'shadow-[0px_-2px_3px_2px_rgba(0,0,0,0.7)]'
      )}
      src={`/projects/images/${data.previewImage}.png`}
      alt={alt}
      quality={95}
      priority={true}
      fill
      sizes="480px, (min-resolution: 2dppx) 960px, (min-resolution: 192dpi) 960px, (min-resolution: 3dppx) 1440px, (min-resolution: 288dpi) 1440px"
    />
  );
}
