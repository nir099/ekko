"use client";

import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";

const carList = [
    // New data
    {
        brand: "BYD",
        model: "Dolphin",
        price: 11000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "BYD",
        model: "Dolphin Performance",
        price: 11500000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "BYD",
        model: "Atto 3",
        price: 15000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "BYD",
        model: "Atto 3 Performance",
        price: 17000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "BYD",
        model: "Seal",
        price: 21000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "BYD",
        model: "Sealion",
        price: 22000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "Kia",
        model: "Sonet",
        price: 7000000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Kia",
        model: "Stonic",
        price: 9000000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Kia",
        model: "EV3",
        price: 13000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "Kia",
        model: "Seltos",
        price: 14000000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Kia",
        model: "EV5 Electric",
        price: 16000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "Kia",
        model: "Sportage HEV/PHEV",
        price: 19000000,
        type: "Hybrid",
        capacity: "",
    },
    {
        brand: "Kia",
        model: "EV6 Electric",
        price: 19000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "Kia",
        model: "Sorento HEV/PHEV",
        price: 22000000,
        type: "Hybrid",
        capacity: "",
    },
    {
        brand: "Kia",
        model: "Carnival HEV/PHEV",
        price: 23000000,
        type: "Hybrid",
        capacity: "",
    },
    {
        brand: "Kia",
        model: "EV9 Electric",
        price: 27000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "Mitsubishi",
        model: "Attrage",
        price: 8890000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Mitsubishi",
        model: "Xpander",
        price: 12190000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Mitsubishi",
        model: "Xforce/Outlander",
        price: 14890000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Mitsubishi",
        model: "Xforce/Outlander",
        price: 18000000,
        type: "Hybrid",
        capacity: "",
    },
    {
        brand: "Mitsubishi",
        model: "Xpander Cross",
        price: 14590000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Mitsubishi",
        model: "Eclipse Cross",
        price: 0, // TBD
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Mitsubishi",
        model: "L200 Pickup Truck",
        price: 0, // TBD
        type: "Diesel",
        capacity: "",
    },
    {
        brand: "Mitsubishi",
        model: "Montero Sport",
        price: 44890000,
        type: "Diesel",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Wigo",
        price: 6700000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Raize",
        price: 9500000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Hilux (Single Cab)",
        price: 10600000,
        type: "Diesel",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Rush",
        price: 15300000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Ativ",
        price: 15500000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Hilux (Double Cab)",
        price: 15800000,
        type: "Diesel",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Hiace",
        price: 14900000,
        type: "Diesel",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Coaster",
        price: 16900000,
        type: "Diesel",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Yaris Cross",
        price: 17500000,
        type: "Hybrid",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Corolla",
        price: 22900000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Prius",
        price: 23000000,
        type: "Hybrid",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Corolla Cross",
        price: 28200000,
        type: "Hybrid",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "RAV4",
        price: 30500000,
        type: "Hybrid",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Camry",
        price: 35000000,
        type: "Hybrid",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Land Cruiser 79",
        price: 21300000,
        type: "Diesel",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Fortuner",
        price: 49000000,
        type: "Diesel",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Alphard",
        price: 57000000,
        type: "Hybrid",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Land Cruiser 250",
        price: 61500000,
        type: "Diesel",
        capacity: "",
    },
    {
        brand: "Toyota",
        model: "Land Cruiser 300",
        price: 94000000,
        type: "Diesel",
        capacity: "",
    },
    {
        brand: "Hyundai",
        model: "Kona",
        price: 18000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "Hyundai",
        model: "Ionic 5",
        price: 22000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "Hyundai",
        model: "Ionic 6",
        price: 16000000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "DFSK",
        model: "Series 3 (premium)",
        price: 12500000,
        type: "EV",
        capacity: "",
    },
    {
        brand: "DFSK",
        model: "Glory i auto",
        price: 16500000,
        type: "Petrol",
        capacity: "",
    },
    {
        brand: "Beigin",
        model: "Premium",
        price: 16000000,
        type: "Petrol",
        capacity: "",
    },
];

const getHybridTaxRate = (engineCapacity: number) => {
    if (engineCapacity < 1000) {
        return 1710000;
    } else if (engineCapacity >= 1001 && engineCapacity <= 1300) {
        return 2600;
    } else if (engineCapacity >= 1301 && engineCapacity <= 1500) {
        return 3250;
    } else if (engineCapacity >= 1501 && engineCapacity <= 1600) {
        return 4550;
    } else if (engineCapacity >= 1601 && engineCapacity <= 1800) {
        return 5950;
    } else if (engineCapacity >= 1801 && engineCapacity <= 2000) {
        return 6500;
    }
    return 0;
};

const getEvTaxRate = (engineCapacity: number) => {
    if (engineCapacity < 50) {
        return 8550;
    } else if (engineCapacity >= 51 && engineCapacity <= 100) {
        return 11400;
    } else if (engineCapacity >= 101 && engineCapacity <= 200) {
        return 17100;
    }
    return 0;
};

const getPetrolTaxRate = (engineCapacity: number) => {
    if (engineCapacity < 1000) {
        return 2300;
    } else if (engineCapacity >= 1001 && engineCapacity <= 1300) {
        return 3650;
    } else if (engineCapacity >= 1301 && engineCapacity <= 1500) {
        return 4200;
    } else if (engineCapacity >= 1501 && engineCapacity <= 1600) {
        return 4850;
    } else if (engineCapacity >= 1601 && engineCapacity <= 1800) {
        return 6050;
    } else if (engineCapacity >= 1801 && engineCapacity <= 2000) {
        return 7250;
    }
    return 0;
};

const hybridUnitCapacityWithPrice = [
    { cc: "<1000", price: "1710000" },
    { cc: "1001 - 1300", price: "2600" },
    { cc: "1301 - 1500", price: "3250" },
    { cc: "1501 - 1600", price: "4550" },
    { cc: "1601 - 1800", price: "5950" },
    { cc: "1801 - 2000", price: "6500" },
];

const evUnitCapacityWithPrice = [
    { capacity: "<50", price: "8550" },
    { capacity: "51 - 100", price: "11400" },
    { capacity: "101 - 200", price: "17100" },
];

const petrolUnitCapacityWithPrice = [
    { cc: "<1000", price: "2300" },
    { cc: "1001 - 1300", price: "3650" },
    { cc: "1301 - 1500", price: "4200" },
    { cc: "1501 - 1600", price: "4850" },
    { cc: "1601 - 1800", price: "6050" },
    { cc: "1801 - 2000", price: "7250" },
];

export default function CarListing() {
    const [vehicleType, setVehicleType] = useState<string>("");
    const [cifValue, setCifValue] = useState<string>("");
    const [engineCapacity, setEngineCapacity] = useState<string>("");
    const [calculationResult, setCalculationResult] = useState<number | null>(
        null
    );

    const groupedCars = useMemo(() => {
        return carList.reduce((acc, car) => {
            if (!acc[car.brand]) {
                acc[car.brand] = [];
            }
            acc[car.brand].push(car);
            return acc;
        }, {} as Record<string, typeof carList>);
    }, []);

    const performCalculation = () => {
        if (!vehicleType || !cifValue || !engineCapacity) {
            return;
        }

        const taxRate =
            vehicleType === "ev"
                ? getEvTaxRate(parseFloat(engineCapacity))
                : vehicleType === "hybrid"
                ? getHybridTaxRate(parseFloat(engineCapacity))
                : getPetrolTaxRate(parseFloat(engineCapacity));
        const engineCapacityTax = taxRate * parseFloat(engineCapacity);
        // let otherLevis = 0.1 * parseFloat(cifValue); ignoring assuming its already on CIF
        const beforeVat = parseFloat(cifValue) + engineCapacityTax;
        const vat = 0.18 * beforeVat;
        const result = beforeVat + vat;

        setCalculationResult(result);
    };

    const handleDownload = () => {
        window.open(
            "https://economynext.com/wp-content/uploads/2024/01/2364-36-Sri-Lanka-Excise-duties-Jan24.pdf",
            "_blank"
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Price calculator</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Select onValueChange={(value) => setVehicleType(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="hybrid">
                            Petrol/Hybrid or Ev/Hybrid
                        </SelectItem>
                        <SelectItem value="ev">EV</SelectItem>
                        <SelectItem value="petrol">Petrol</SelectItem>
                    </SelectContent>
                </Select>

                <Input
                    type="number"
                    placeholder="Enter CIF value in LKR"
                    value={cifValue}
                    onChange={(e) => setCifValue(e.target.value)}
                />

                <Input
                    type="number"
                    placeholder={
                        vehicleType === "ev"
                            ? "Enter engine capacity in kWh"
                            : "Enter engine capacity in cc"
                    }
                    value={engineCapacity}
                    onChange={(e) => setEngineCapacity(e.target.value)}
                />

                <Button onClick={performCalculation}>Calculate</Button>
            </div>

            {calculationResult !== null && (
                <div className="mb-8 p-4 bg-secondary rounded-md">
                    <p className="text-lg font-semibold">
                        Final Price:{" "}
                        {Intl.NumberFormat("en-SI", {
                            style: "currency",
                            currency: "LKR",
                        }).format(calculationResult)}
                    </p>
                </div>
            )}

            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                Unit references (2024)
                <Download
                    className="w-8 h-8 text-primary cursor-pointer hover:text-primary/80 transition-colors"
                    aria-label="reference table source of truth"
                    onClick={handleDownload}
                />
            </h2>
            <div className="my-8 bg-secondary p-8 rounded-md">
                <div className="grid grid-cols-1 wrap gap-4 justify-between  md:grid-cols-3 ">
                    <div>
                        <h3 className="text-2xl font-semibold">Petrol</h3>
                        <h4 className="text-sm font-normal mb-4">
                            refer section: 8703.20
                        </h4>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Engine capacity (cc)</TableHead>
                                    <TableHead>Unit price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {petrolUnitCapacityWithPrice.map(
                                    (row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.cc}</TableCell>
                                            <TableCell>
                                                {Intl.NumberFormat("en-SI", {
                                                    style: "currency",
                                                    currency: "LKR",
                                                    notation: "standard",
                                                    currencyDisplay:
                                                        "narrowSymbol",
                                                    maximumFractionDigits: 0,
                                                    minimumFractionDigits: 0,
                                                }).format(
                                                    parseFloat(row.price)
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold">
                            Petrol/Hybrid or EV/Hybrid
                        </h3>
                        <h4 className="text-sm font-normal mb-4">
                            refer section: 8703.40 and 8703.60
                        </h4>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Engine capacity (cc)</TableHead>
                                    <TableHead>Unit price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {hybridUnitCapacityWithPrice.map(
                                    (row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.cc}</TableCell>
                                            <TableCell>
                                                {Intl.NumberFormat("en-SI", {
                                                    style: "currency",
                                                    currency: "LKR",
                                                    notation: "standard",
                                                    currencyDisplay:
                                                        "narrowSymbol",
                                                    maximumFractionDigits: 0,
                                                    minimumFractionDigits: 0,
                                                }).format(
                                                    parseFloat(row.price)
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold">EV</h3>
                        <h4 className="text-sm font-normal mb-4">
                            refer section: 8703.80
                        </h4>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Battery capacity (kW)</TableHead>
                                    <TableHead>Unit price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {evUnitCapacityWithPrice.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.capacity}</TableCell>
                                        <TableCell>
                                            {Intl.NumberFormat("en-SI", {
                                                style: "currency",
                                                currency: "LKR",
                                                notation: "standard",
                                                currencyDisplay: "narrowSymbol",
                                                maximumFractionDigits: 0,
                                                minimumFractionDigits: 0,
                                            }).format(parseFloat(row.price))}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <h1 className="text-3xl font-bold mb-8">Already known prices</h1>

            {Object.entries(groupedCars).map(([brand, cars]) => (
                <div
                    key={brand}
                    className="mb-12 rounded-md border border-cyan-900 p-4 bg-secondary"
                >
                    <h2 className="text-2xl font-semibold mb-4">{brand}</h2>
                    <Table className="table-fixed">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Engine Type</TableHead>
                                <TableHead>Engine Capacity</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cars.map((car, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {car.model}
                                    </TableCell>
                                    <TableCell>{car.type}</TableCell>
                                    <TableCell>{car.capacity}</TableCell>
                                    <TableCell>
                                        {Intl.NumberFormat("en-SI", {
                                            style: "currency",
                                            currency: "LKR",
                                            notation: "compact",
                                            currencyDisplay: "narrowSymbol",
                                            maximumFractionDigits: 1,
                                            minimumFractionDigits: 0,
                                        }).format(car.price)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ))}
        </div>
    );
}
