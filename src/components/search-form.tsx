"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, MapPin, Users, Search, Plus, Minus, Baby, User } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { useLanguage } from "@/context/language-context";
import { allCities } from "@/lib/data";
import { Card } from "./ui/card";

const SearchForm = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const [location, setLocation] = useState("");
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [dates, setDates] = useState<DateRange | undefined>();
  
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  const totalGuests = adults + children;

  useEffect(() => {
    if (dates?.from && dates.to) {
      setIsDatePopoverOpen(false);
    }
  }, [dates]);

  useEffect(() => {
    if (location.length > 1) {
        const filteredCities = allCities.filter(city => 
            city.toLowerCase().includes(location.toLowerCase())
        );
        setSuggestions(filteredCities);
        setIsSuggestionsOpen(true);
    } else {
        setSuggestions([]);
        setIsSuggestionsOpen(false);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuggestionsOpen(false);
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (dates?.from) params.set("from", format(dates.from, "yyyy-MM-dd"));
    if (dates?.to) params.set("to", format(dates.to, "yyyy-MM-dd"));
    if (adults) params.set("adults", adults.toString());
    if (children) params.set("children", children.toString());
    if (infants) params.set("infants", infants.toString());

    router.push(`/search?${params.toString()}`);
  };

  const handleSuggestionClick = (city: string) => {
    setLocation(city);
    setIsSuggestionsOpen(false);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="grid grid-cols-1 md:grid-cols-4 items-center gap-4"
    >
      <div className="relative" ref={searchContainerRef}>
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
            placeholder={t('where_to')}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
            autoComplete="off"
        />
        {isSuggestionsOpen && suggestions.length > 0 && (
            <Card className="absolute z-10 w-full mt-2 bg-card shadow-lg max-h-60 overflow-y-auto">
                <ul>
                    {suggestions.map(city => (
                        <li 
                            key={city}
                            onClick={() => handleSuggestionClick(city)}
                            className="px-4 py-2 cursor-pointer hover:bg-accent"
                        >
                            {city}
                        </li>
                    ))}
                </ul>
            </Card>
        )}
      </div>

      <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dates && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dates?.from ? (
              dates.to ? (
                <>
                  {format(dates.from, "dd LLL y", { locale: fr })} -{" "}
                  {format(dates.to, "dd LLL y", { locale: fr })}
                </>
              ) : (
                format(dates.from, "dd LLL y", { locale: fr })
              )
            ) : (
              <span>{t('choose_dates')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dates?.from}
            selected={dates}
            onSelect={setDates}
            numberOfMonths={2}
            locale={fr}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <Users className="mr-2 h-4 w-4" />
            <span>{totalGuests} {totalGuests > 1 ? t('travelers') : t('traveler')}</span>
            {infants > 0 && <span>, {infants} {infants > 1 ? t('babies') : t('baby')}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">{t('travelers')}</h4>
                    <p className="text-sm text-muted-foreground">
                        {t('select_travelers')}
                    </p>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="adults">{t('adults')}</Label>
                            <p className="text-xs text-muted-foreground">{t('adults_desc')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(Math.max(1, adults - 1))} disabled={adults <= 1}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{adults}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(adults + 1)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="children">{t('children')}</Label>
                             <p className="text-xs text-muted-foreground">{t('children_desc')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(Math.max(0, children - 1))} disabled={children <= 0}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{children}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(children + 1)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="infants">{t('infants')}</Label>
                             <p className="text-xs text-muted-foreground">{t('infants_desc')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setInfants(Math.max(0, infants - 1))} disabled={infants <= 0}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{infants}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setInfants(infants + 1)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PopoverContent>
      </Popover>

      <Button type="submit" className="w-full md:w-auto">
        <Search className="mr-2 h-4 w-4" />
        {t('search')}
      </Button>
    </form>
  );
}

export { SearchForm };
