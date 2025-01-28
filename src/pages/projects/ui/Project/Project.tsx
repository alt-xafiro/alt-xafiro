'use client';

import clsx from 'clsx';
import * as motion from 'motion/react-client';

import { useEffect, useRef, useState } from 'react';

import { CustomComponentProps } from '@shared/lib';

import { ProjectData } from '../../model/projects';

import { Links } from './Links';
import { PreviewImage } from './PreviewImage';
import { Property, PropertyType } from './Property';
import { Stack, StackLocales } from './Stack/Stack';

type ProjectProps = CustomComponentProps & {
  data: ProjectData;
  locales: {
    project: {
      data: {
        name: string;
        type: string;
        status: string;
        noPreview: string | null;
      };
      projectLinks: {
        preview: string;
        source: string;
      };
    };
    stack: StackLocales;
  };
};

export function Project({ className, data, locales }: ProjectProps) {
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
      <motion.div
        className={clsx(
          className,
          'group/project relative h-[225px] w-full min-w-[312px] max-w-[480px]',
          'rounded-[24px] bg-space-800/40 text-space-700 shadow-2xl'
        )}
        whileHover={{ scale: 1.03 }}
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
            alt={locales.project.data.name}
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
          locales={{
            data: {
              noPreview: locales.project.data.noPreview
            },
            projectLinks: {
              preview: locales.project.projectLinks.preview,
              source: locales.project.projectLinks.source
            }
          }}
        />

        <div
          className="absolute right-[12px] top-[12px] flex cursor-pointer flex-row items-center justify-end space-x-4"
          ref={typeStatusRef}
          onClick={() => toggleActive()}
        >
          <Property
            type={PropertyType.Type}
            data={data}
            propertyLocale={locales.project.data.type}
          />
          <Property
            type={PropertyType.Status}
            data={data}
            propertyLocale={locales.project.data.status}
          />
        </div>

        <Stack
          className="absolute bottom-[12px] right-[14px]"
          ref={stackRef}
          projectID={data.id}
          stackList={data.stackList}
          stackLocales={locales.stack}
        />
      </motion.div>
      <h2 className="w-full pt-[0.375rem] text-center text-[1.375rem] leading-[1.875rem] h-md:text-xl sm:text-xl">
        {locales.project.data.name}
      </h2>
    </div>
  );
}
