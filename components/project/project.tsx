'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MouseEventHandler, Ref, useEffect, useRef, useState } from 'react';

import { CustomComponentProps, ProjectData } from '@/types';

import Stack from '@/components/stack/stack';
import SVGIcon from '@/components/svg-icon/svg-icon';

type ProjectProps = CustomComponentProps & {
  data: ProjectData;
};

export default function Project({ className, data }: ProjectProps) {
  const t = useTranslations('Projects');

  const [active, setActive] = useState<boolean>(false);

  const previewRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const typeStatusRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const toggleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent | TouchEvent) => {
      if (!active) return;

      if (
        [previewRef, linksRef, typeStatusRef, stackRef].every(
          (el) => el.current && !el.current.contains(evt.target as Node)
        )
      ) {
        setActive(false);
      }
    };

    const handleKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        if (!active) return;

        setActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [active]);

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div
        className={clsx(
          className,
          'group/project relative h-[225px] w-full min-w-[312px] max-w-[480px]',
          'rounded-[24px] bg-space-800/40 text-space-700 shadow-2xl'
        )}
      >
        <button
          className="relative h-full w-full cursor-pointer"
          type="button"
          ref={previewRef}
          onClick={() => toggleActive()}
        >
          <PreviewImage
            className={clsx(
              active
                ? 'blur-[8px] brightness-[0.7]'
                : 'blur-0 brightness-100 group-hover/project:brightness-[1.13]',
              'rounded-[24px] transition-all'
            )}
            data={data}
          />
        </button>

        <Links
          className={clsx(
            active ? 'flex' : 'hidden',
            'absolute left-1/2 top-1/2 h-[48px] w-[160px] -translate-x-1/2 -translate-y-1/2 transform flex-row items-center justify-between h-md:h-[36px] h-md:w-[120px] sm:h-[36px] sm:w-[120px]'
          )}
          ref={linksRef}
          data={data}
          onClick={() => toggleActive()}
        />

        <div
          className="absolute right-[12px] top-[12px] flex cursor-pointer flex-row items-center justify-end space-x-4"
          ref={typeStatusRef}
          onClick={() => toggleActive()}
        >
          <Type data={data} />
          <Status data={data} />
        </div>

        <Stack
          className="absolute bottom-[12px] right-[14px]"
          ref={stackRef}
          projectID={data.id}
          stackList={data.stackList}
        />
      </div>
      <h2 className="w-full pt-[0.375rem] text-center text-[1.375rem] leading-[1.875rem] h-md:text-xl sm:text-xl">
        {t(`${data.locale}`)}
      </h2>
    </div>
  );
}

type PreviewImageProps = CustomComponentProps & {
  data: ProjectData;
};

function PreviewImage({ className, data }: PreviewImageProps) {
  const t = useTranslations('Projects');

  return (
    <Image
      className={clsx(
        className,
        'h-auto w-full object-cover',
        data.centeredPreviewImage ? 'object-center' : 'object-top',
        data.id === 'alt-xafiro' && 'shadow-[0px_-2px_3px_2px_rgba(0,0,0,0.7)]'
      )}
      src={`/projects/${data.previewImage}.png`}
      alt={t(data.locale)}
      quality={95}
      priority={true}
      fill
      sizes="480px, (min-resolution: 2dppx) 960px, (min-resolution: 192dpi) 960px, (min-resolution: 3dppx) 1440px, (min-resolution: 288dpi) 1440px"
    />
  );
}

type ProjectLinksProps = CustomComponentProps & {
  ref?: Ref<HTMLDivElement>;
  data: ProjectData;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};

function Links({ className, ref, data, onClick }: ProjectLinksProps) {
  const t = useTranslations();

  return (
    <div className={clsx(className, 'cursor-pointer')} ref={ref}>
      {data.previewURL !== null ? (
        <a
          className="tooltip"
          href={data.previewURL}
          target="_blank"
          rel="noopener noreferrer"
          data-tooltip-content={t('ProjectLinks.preview')}
          data-tooltip-place="left"
        >
          <SVGIcon
            className="h-[48px] w-[64px] text-space-800 h-md:h-[28px] h-md:w-[48px] sm:h-[28px] sm:w-[48px]"
            icon="preview"
            theme={data.iconsTheme}
          />
          <span className="sr-only">{t('ProjectLinks.preview')}</span>
        </a>
      ) : (
        <div
          className="tooltip h-[48px] w-[64px] cursor-default text-space-800 h-md:h-[36px] h-md:w-[48px] sm:h-[36px] sm:w-[48px]"
          tabIndex={0}
          data-tooltip-content={t(`Projects.${data.locale}-no-preview`)}
          data-tooltip-place="left"
        >
          <SVGIcon
            className="h-full w-full"
            icon="no-preview"
            theme={data.iconsTheme}
          />
        </div>
      )}
      <div className="h-full flex-grow" onClick={onClick} />
      <div>
        <a
          className="tooltip"
          href={data.sourceURL}
          target="_blank"
          rel="noopener noreferrer"
          data-tooltip-content={t('ProjectLinks.source')}
          data-tooltip-place="right"
        >
          <SVGIcon
            className="h-[48px] w-[48px] text-space-800 h-md:h-[36px] h-md:w-[36px] sm:h-[36px] sm:w-[36px]"
            icon="github"
            theme={data.iconsTheme}
          />
          <span className="sr-only">{t('ProjectLinks.source')}</span>
        </a>
      </div>
    </div>
  );
}

type TypeProps = CustomComponentProps & {
  data: ProjectData;
};

function Type({ className, data }: TypeProps) {
  const t = useTranslations('ProjectType');

  if (data.type === 'pet') {
    return null;
  }

  return (
    <div
      className={clsx(className, 'tooltip')}
      tabIndex={0}
      data-tooltip-content={t(data.type)}
      data-tooltip-place="left"
    >
      <SVGIcon
        className="h-[36px] w-[36px] text-space-800 h-md:h-[28px] h-md:w-[28px] sm:h-[28px] sm:w-[28px]"
        icon={data.type}
        theme={data.iconsTheme}
      />
      <span className="sr-only">{t(data.type)}</span>
    </div>
  );
}

type StatusProps = CustomComponentProps & {
  data: ProjectData;
};

function Status({ className, data }: StatusProps) {
  const t = useTranslations('ProjectStatus');

  if (data.status === 'done') return null;

  return (
    <div
      className={clsx(className, 'tooltip')}
      tabIndex={0}
      data-tooltip-content={t(data.status)}
      data-tooltip-place="right"
    >
      <SVGIcon
        className="h-[36px] w-[36px] text-space-800 h-md:h-[28px] h-md:w-[28px] sm:h-[28px] sm:w-[28px]"
        icon={data.status}
        theme={data.iconsTheme}
      />
      <span className="sr-only">{t(data.status)}</span>
    </div>
  );
}
