'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import type { StockWithWatchlistStatus } from '@/lib/actions/finnhub.actions';
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Loader2, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { searchStocks } from '@/lib/actions/finnhub.actions';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchCommandProps {
  renderAs?: 'button' | 'text';
  label?: string;
  initialStocks: StockWithWatchlistStatus[];
}

export default function SearchCommand({
  renderAs = 'button',
  label = 'Ajouter une action',
  initialStocks,
}: SearchCommandProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(initialStocks);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [debouncedSearch] = useDebounce((term: string) => {
    setDebouncedSearchTerm(term);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const isSearchMode = !!debouncedSearchTerm.trim();
  const displayStocks = useMemo(() => {
    const uniqueStocks =
      stocks?.filter(
        (stock, index, self) =>
          index ===
          self.findIndex((s) => s.symbol === stock.symbol && s.exchange === stock.exchange)
      ) || [];

    return isSearchMode ? uniqueStocks : uniqueStocks.slice(0, 10);
  }, [isSearchMode, stocks]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const search = async () => {
      if (!debouncedSearchTerm.trim()) {
        setStocks(initialStocks);
        return;
      }

      setLoading(true);
      try {
        const results = await searchStocks(debouncedSearchTerm.trim());
        setStocks(results);
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        setStocks([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedSearchTerm, initialStocks]);

  const handleSelectStock = useCallback(() => {
    setOpen(false);
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setStocks(initialStocks);
  }, [initialStocks]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setSearchTerm('');
        setDebouncedSearchTerm('');
        setStocks(initialStocks);
      }
    },
    [initialStocks]
  );

  return (
    <>
      {renderAs === 'text' ? (
        <span onClick={() => setOpen(true)} className='search-text'>
          {label}
        </span>
      ) : (
        <Button onClick={() => setOpen(true)} className='search-btn'>
          {label}
        </Button>
      )}
      <CommandDialog open={open} onOpenChange={handleOpenChange} className='search-dialog'>
        <div className='search-field'>
          <CommandInput
            value={searchTerm}
            onValueChange={setSearchTerm}
            placeholder='Rechercher des actions...'
            className='search-input'
          />
          {loading && <Loader2 className='search-loader animate-spin' />}
        </div>
        <CommandList className='search-list'>
          {loading ? (
            <CommandEmpty className='search-list-empty'>Chargement des actions...</CommandEmpty>
          ) : displayStocks?.length === 0 ? (
            <div className='search-list-indicator'>
              {isSearchMode ? 'Aucun résultat trouvé' : 'Aucune action disponible'}
            </div>
          ) : (
            <ul>
              <div className='search-count'>
                {isSearchMode ? 'Résultats de la recherche' : 'Actions populaires'}
                {` `}({displayStocks?.length || 0})
              </div>
              {Array.from(
                new Map(displayStocks?.map((stock) => [stock.symbol, stock])).values()
              ).map((stock) => (
                <li key={`${stock.symbol}-${stock.exchange}`} className='search-item'>
                  <Link
                    href={`/stocks/${stock.symbol}`}
                    onClick={handleSelectStock}
                    className='search-item-link'
                  >
                    <TrendingUp className='h-4 w-4 text-gray-500' />
                    <div className='flex-1'>
                      <div className='search-item-name'>{stock.name}</div>
                      <div className='text-sm text-gray-500'>
                        {stock.symbol} | {stock.exchange} | {stock.type}
                      </div>
                    </div>
                    <Star />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
