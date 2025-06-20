import { Checkbox } from "@/components/ui/checkbox";

const FilterSidebar = ({
  priceRange,
  airlines,
  selectedAirlines,
  handleAirlineChange,
  stopOptions,
  selectedStops,
  handleStopsChange,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="mb-3 font-semibold">Price Range</h3>
      {/* <Slider
        value={priceRange}
        onValueChange={setPriceRange}
        max={1000}
        step={50}
        className="mb-2"
      /> */}
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>${priceRange && priceRange[0]}</span>
        <span>${priceRange && priceRange[1]}</span>
      </div>
    </div>

    <div>
      <h3 className="mb-3 font-semibold">Airlines</h3>
      <div className="space-y-2">
        {airlines?.map((airline) => (
          <div key={airline} className="flex items-center space-x-2">
            <Checkbox
              id={airline}
              checked={selectedAirlines.includes(airline)}
              onCheckedChange={(checked) =>
                handleAirlineChange(airline, checked)
              }
            />
            <label htmlFor={airline} className="text-sm">
              {airline}
            </label>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="mb-3 font-semibold">Stops</h3>
      <div className="space-y-2">
        {stopOptions?.map((stop) => (
          <div key={stop} className="flex items-center space-x-2">
            <Checkbox
              id={stop}
              checked={selectedStops.includes(stop)}
              onCheckedChange={(checked) => handleStopsChange(stop, checked)}
            />
            <label htmlFor={stop} className="text-sm">
              {stop}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FilterSidebar;
