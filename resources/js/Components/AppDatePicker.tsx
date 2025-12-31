import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/Components/ui/button'
import { Calendar } from '@/Components/ui/calendar'
import { Label } from '@/Components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { cn } from '@/lib/utils'
import { tr } from 'date-fns/locale'

interface DatePickerProps {
  attr?: string
  label?: string
  placeholder?: string
  mainClass?: string // additional class for main container
  triggerClass?: string // additional class for trigger button
}

export default function DatePicker({
  attr,
  label,
  placeholder,
  mainClass,
  triggerClass,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className={cn('flex flex-col gap-3', mainClass)}>
      <Label htmlFor={attr || 'datepicker'} className="px-1 ">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={attr || 'datepicker'}
            className={cn('justify-between font-normal text-zinc-500', triggerClass)}
          >
            {date ? date.toLocaleDateString() : placeholder}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
