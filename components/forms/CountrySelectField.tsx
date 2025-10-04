/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import countryList from 'react-select-country-list';

type CountrySelectProps = {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
  required?: boolean;
};

const CountrySelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const countries = countryList().getData();

  const getFlagImage = (countryCode: string) => {
    if (!countryCode || countryCode.length !== 2) return '';
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='country-select-trigger'
        >
          {value ? (
            <span className='flex items-center gap-2'>
              <div className='relative h-4 w-6 flex-shrink-0'>
                <Image
                  src={getFlagImage(value)}
                  alt=''
                  fill
                  className='rounded-sm object-cover'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const textNode = document.createTextNode(value);
                      parent.appendChild(textNode);
                    }
                  }}
                  unoptimized={process.env.NODE_ENV !== 'production'}
                />
              </div>
              <span>{countries.find((c) => c.value === value)?.label}</span>
            </span>
          ) : (
            'Select your country...'
          )}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full border-gray-600 bg-gray-800 p-0' align='start'>
        <Command className='border-gray-600 bg-gray-800'>
          <CommandInput placeholder='Search countries...' className='country-select-input' />
          <CommandEmpty className='country-select-empty'>Aucun pays trouvé.</CommandEmpty>
          <CommandList className='scrollbar-hide-default max-h-60 bg-gray-800'>
            <CommandGroup className='bg-gray-800'>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={`${country.label} ${country.value}`}
                  onSelect={() => {
                    onChange(country.value);
                    setOpen(false);
                  }}
                  className='country-select-item'
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 text-yellow-500',
                      value === country.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <span className='flex items-center gap-2'>
                    <div className='relative h-4 w-6 flex-shrink-0'>
                      <Image
                        src={getFlagImage(country.value)}
                        alt=''
                        fill
                        className='rounded-sm object-cover'
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const textNode = document.createTextNode(country.value);
                            parent.appendChild(textNode);
                          }
                        }}
                        unoptimized={process.env.NODE_ENV !== 'production'}
                      />
                    </div>
                    <span>{country.label}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const CountrySelectField = ({
  name,
  label,
  control,
  error,
  required = false,
}: CountrySelectProps) => {
  return (
    <div className='space-y-2'>
      <Label htmlFor={name} className='form-label'>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => <CountrySelect value={field.value} onChange={field.onChange} />}
      />
      {error && <p className='text-sm text-red-500'>{error.message}</p>}
      <p className='text-xs text-gray-500'>
        {' '}
        Nous aide à afficher les données de marché et les actualités pertinentes pour vous.
      </p>
    </div>
  );
};
