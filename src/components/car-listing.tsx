"use client";

import { Download } from "lucide-react";
import { useRef, useState } from "react";
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
import { BorderBeam } from "./ui/border-beam";

enum VehicleTypes {
    PETROL = "Petrol",
    PETROL_HYBRID = "Petrol/Hybrid or Petrol/PHEV",
}

enum Currency {
    LKR = "LKR -> 1",
    USD = "USD -> 302",
    GBP = "GBP -> 375",
    JPY = "JPY -> 2",
}

// const getElectricCarTaxRate = (power: number) => {
//     if (power <= 50) {
//         return 9050;
//     } else if (power <= 100) {
//         return 12050;
//     } else if (power <= 200) {
//         return 18100;
//     } else if (power > 200) {
//         return 48300;
//     }
//     return 0;
// };

// const electricCarUnitCapacityWithPrice = [
//     { cc: "<50kW", price: "9050", maxTax: 452500 },
//     { cc: "50 - 100kW", price: "12050", maxTax: 1205000, highlight: true },
//     { cc: "101 - 200kW", price: "18100", maxTax: 3620000 },
//     { cc: ">200kW", price: "48300" },
// ];

// const electricCarUnitCapacityWithMoreThanThreeYearsPrice = [
//     { cc: "<50kW", price: "18100", maxTax: 905000 },
//     { cc: "50 - 100kW", price: "18100", maxTax: 1810000, highlight: false },
//     { cc: "101 - 200kW", price: "30200", maxTax: 6040000 },
//     { cc: ">200kW", price: "66400" },
// ];

const getPetrolTaxRate = (engineCapacity: number) => {
    if (engineCapacity < 1000) {
        if (engineCapacity * 2450 > 1992000) return 1992000 / engineCapacity;
        return 2450;
    } else if (engineCapacity <= 1300) {
        return 3850;
    } else if (engineCapacity <= 1500) {
        return 4450;
    } else if (engineCapacity <= 1600) {
        return 5150;
    } else if (engineCapacity <= 1800) {
        return 6400;
    } else if (engineCapacity <= 2000) {
        return 7700;
    } else if (engineCapacity <= 2500) {
        return 8450;
    } else if (engineCapacity <= 2750) {
        return 9650;
    } else if (engineCapacity <= 3000) {
        return 10850;
    } else if (engineCapacity <= 4000) {
        return 13300;
    } else if (engineCapacity > 4000) {
        return 13300;
    }
    return 0;
};

const petrolUnitCapacityWithPrice = [
    { cc: "<=1000", price: "1992000", maxTax: 1992000 },
    { cc: "1001 - 1300", price: "3850", maxTax: 3850000, highlight: true },
    { cc: "1301 - 1500", price: "4450", maxTax: 6675000, highlight: true },
    { cc: "1501 - 1600", price: "5150", maxTax: 8240000 },
    { cc: "1601 - 1800", price: "6400", maxTax: 11520000 },
    { cc: "1801 - 2000", price: "7700", maxTax: 15400000 },
    { cc: "2001 - 2500", price: "8450", maxTax: 21125000 },
    { cc: "2501 - 2750", price: "9650", maxTax: 26537500 },
    { cc: "2751 - 3000", price: "10850", maxTax: 32550000 },
    { cc: "3001 - 4000", price: "12050", maxTax: 48200000 },
    { cc: ">4000", price: "13300" },
];

const getPetrolHybridTaxRate = (engineCapacity: number) => {
    if (engineCapacity <= 1000) {
        return 1810;
    } else if (engineCapacity <= 1300) {
        return 2750;
    } else if (engineCapacity <= 1500) {
        return 3450;
    } else if (engineCapacity <= 1600) {
        return 4800;
    } else if (engineCapacity <= 1800) {
        return 6300;
    } else if (engineCapacity <= 2000) {
        return 6900;
    } else if (engineCapacity <= 2500) {
        return 7250;
    } else if (engineCapacity <= 2750) {
        return 8450;
    } else if (engineCapacity <= 3000) {
        return 9650;
    } else if (engineCapacity <= 4000) {
        return 10850;
    } else if (engineCapacity > 4000) {
        return 12050;
    }
    return 0;
};

const petrolHybridUnitCapacityWithPrice = [
    { cc: "<=1000", price: "1810900", maxTax: 1810900 },
    { cc: "1001 - 1300", price: "2750", maxTax: 3575000, highlight: true },
    { cc: "1301 - 1500", price: "3450", maxTax: 5175000, highlight: true },
    { cc: "1501 - 1600", price: "4800", maxTax: 7680000 },
    { cc: "1601 - 1800", price: "6300", maxTax: 11340000 },
    { cc: "1801 - 2000", price: "6900", maxTax: 13800000 },
    { cc: "2001 - 2500", price: "7250", maxTax: 18125000 },
    { cc: "2501 - 2750", price: "8450", maxTax: 23237500 },
    { cc: "2751 - 3000", price: "9650", maxTax: 28950000 },
    { cc: "3001 - 4000", price: "10850", maxTax: 43400000 },
    { cc: ">4000", price: "12050" },
];

// const getDieselTaxRate = (engineCapacity: number) => {
//     if (engineCapacity <= 1500) {
//         return 5550;
//     } else if (engineCapacity <= 1600) {
//         return 6950;
//     } else if (engineCapacity <= 1800) {
//         return 8300;
//     } else if (engineCapacity <= 2000) {
//         return 9650;
//     } else if (engineCapacity <= 2500) {
//         return 9650;
//     } else if (engineCapacity <= 2750) {
//         return 10850;
//     } else if (engineCapacity <= 3000) {
//         return 12050;
//     } else if (engineCapacity <= 4000) {
//         return 13300;
//     } else if (engineCapacity > 4000) {
//         return 14500;
//     }
//     return 0;
// };

const dieselUnitCapacityWithPrice = [
    { cc: "<1500", price: "5550", maxTax: 8325000 },
    { cc: "1501 - 1600", price: "6950", maxTax: 11120000, highlight: false },
    { cc: "1601 - 1800", price: "8300", maxTax: 14940000 },
    { cc: "1801 - 2000", price: "9650", maxTax: 19300000 },
    { cc: "2001 - 2500", price: "9650", maxTax: 24125000 },
    { cc: "2501 - 2750", price: "10850", maxTax: 29837500 },
    { cc: "2751 - 3000", price: "12050", maxTax: 36150000 },
    { cc: "3001 - 4000", price: "13300", maxTax: 53200000 },
    { cc: ">4000", price: "14500" },
];

// const getDieselHybridTaxRate = (engineCapacity: number) => {
//     if (engineCapacity <= 1500) {
//         return 4150;
//     } else if (engineCapacity <= 1600) {
//         return 5550;
//     } else if (engineCapacity <= 1800) {
//         return 6900;
//     } else if (engineCapacity <= 2000) {
//         return 8350;
//     } else if (engineCapacity <= 2500) {
//         return 8450;
//     } else if (engineCapacity <= 2750) {
//         return 9650;
//     } else if (engineCapacity <= 3000) {
//         return 10850;
//     } else if (engineCapacity <= 4000) {
//         return 12050;
//     } else if (engineCapacity > 4000) {
//         return 13300;
//     }
//     return 0;
// };

const dieselHybridUnitCapacityWithPrice = [
    { cc: "<1500", price: "4150", maxTax: 6225000 },
    { cc: "1501 - 1600", price: "5550", maxTax: 8880000, highlight: false },
    { cc: "1601 - 1800", price: "6900", maxTax: 12420000 },
    { cc: "1801 - 2000", price: "8350", maxTax: 16700000 },
    { cc: "2001 - 2500", price: "8450", maxTax: 21125000 },
    { cc: "2501 - 2750", price: "9650", maxTax: 26537500 },
    { cc: "2751 - 3000", price: "10850", maxTax: 32550000 },
    { cc: "3001 - 4000", price: "12050", maxTax: 48200000 },
    { cc: ">4000", price: "13300" },
];

const getTaxRate = (type: VehicleTypes, engineCapacity: number) => {
    switch (type) {
        // case VehicleTypes.EV:
        //     return getElectricCarTaxRate(engineCapacity);
        case VehicleTypes.PETROL:
            return getPetrolTaxRate(engineCapacity);
        case VehicleTypes.PETROL_HYBRID:
            return getPetrolHybridTaxRate(engineCapacity);
        // case VehicleTypes.DIESEL:
        //     return getDieselTaxRate(engineCapacity);
        // case VehicleTypes.DIESEL_HYBRID:
        //     return getDieselHybridTaxRate(engineCapacity);
        default:
            return 0;
    }
};

const getPetrolLuxuryTax = (cif: number) => {
    if (cif < 5000000) return 0;
    return cif - 5000000;
};

const getPetrolHybridLuxuryTax = (cif: number) => {
    if (cif < 5500000) return 0;
    return (cif - 5500000) * 0.8;
};

const currencyToValue = (currency: Currency) => {
    if (currency === Currency.USD) {
        return 302;
    }
    if (currency === Currency.GBP) {
        return 375;
    }
    if (currency === Currency.LKR) {
        return 1;
    }
    if (currency === Currency.JPY) {
        return 2;
    }
    return 0;
};
export default function CarListing() {
    const [vehicleType, setVehicleType] = useState<VehicleTypes | null>(null);
    const [cifValue, setCifValue] = useState<string>("");
    const [currency, setCurrency] = useState<Currency | null>(null);
    const [engineCapacity, setEngineCapacity] = useState<string>("");
    const [finalResult, setFinalResult] = useState<{
        final: number;
        exciseDuty: number;
        vat: number;
        customDuty: number;
        luxuryTax: number;
        cifVal: number;
        totalTax: number;
        oldPrice: number;
        increase: number;
    } | null>(null);
    const resultRef = useRef<HTMLDivElement | null>(null);

    const scrollToElement = () => {
        setTimeout(() => {
            if (resultRef.current) {
                resultRef.current.scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                });
            }
        }, 100);
    };

    const performCalculation = () => {
        if (!vehicleType || !cifValue || !engineCapacity || !currency) {
            setFinalResult(null);
            return;
        }

        const cifVal =
            parseFloat(cifValue) * currencyToValue(currency as Currency);
        const taxRate = getTaxRate(vehicleType, parseFloat(engineCapacity));
        const exciseDuty = taxRate * parseFloat(engineCapacity);
        const customDuty = 0.4 * cifVal;

        const beforeVat = cifVal + customDuty;
        const vat = 0.18 * beforeVat;

        const luxuryTax =
            vehicleType === VehicleTypes.PETROL_HYBRID
                ? getPetrolHybridLuxuryTax(cifVal)
                : getPetrolLuxuryTax(cifVal);

        const result = cifVal + customDuty + exciseDuty + vat + luxuryTax;
        const oldPrice = cifVal + exciseDuty + cifVal * 0.1;
        const increase = ((result - oldPrice) / oldPrice) * 100;
        const totalTax = customDuty + exciseDuty + vat + luxuryTax;
        setFinalResult({
            cifVal,
            final: result,
            exciseDuty,
            customDuty,
            vat,
            luxuryTax,
            oldPrice,
            increase,
            totalTax,
        });
        scrollToElement();
    };

    const handleDownload = () => {
        window.open(
            "https://www.treasury.gov.lk/api/file/6bb410ce-f149-444d-b2c0-515c5e053824"
        );
    };

    // const handleReferencesDownload = () => {
    //     window.open(
    //         "https://www.customs.gov.lk/wp-content/uploads/2024/12/Preamble-intergrated.pdf"
    //     );
    // };

    // const handleLeviesDownload = () => {
    //     window.open(
    //         "https://www.customs.gov.lk/wp-content/uploads/2024/11/Chapter_87.pdf"
    //     );
    // };

    const informationSections = [
        {
            name: "Petrol",
            values: petrolUnitCapacityWithPrice,
        },
        {
            name: "Petrol/Hybrid",
            values: petrolHybridUnitCapacityWithPrice,
        },
        {
            name: "Diesel",
            values: dieselUnitCapacityWithPrice,
        },
        {
            name: "Diesel/Hybrid",
            values: dieselHybridUnitCapacityWithPrice,
        },
        // {
        //     name: "EV",
        //     values: electricCarUnitCapacityWithPrice,
        // },
        // {
        //     name: "EV more than 3 years",
        //     values: electricCarUnitCapacityWithMoreThanThreeYearsPrice,
        // },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Price calculator</h1>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                <Select
                    onValueChange={(value: VehicleTypes) =>
                        setVehicleType(value)
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(VehicleTypes).map((v) => (
                            <SelectItem key={v} value={v}>
                                {v}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input
                    type="number"
                    placeholder="Enter CIF value"
                    value={cifValue}
                    onChange={(e) => setCifValue(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" ? performCalculation() : null
                    }
                />

                <Select onValueChange={(value: Currency) => setCurrency(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(Currency).map((v) => (
                            <SelectItem key={v} value={v}>
                                {v}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input
                    type="number"
                    placeholder={"Enter engine capacity in cc"}
                    value={engineCapacity}
                    onChange={(e) => setEngineCapacity(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" ? performCalculation() : null
                    }
                    max={2500}
                    min={1}
                />

                <Button onClick={performCalculation}>Calculate</Button>
            </div>
            <div className="mb-8 p-4 border border-secondary rounded-md text-m">
                <p>Excise Duty : Engine capacity * Engine unit price</p>
                <p>Custom Duty : CIF * 40% ( 30% surcharge + PAL )</p>
                <p>Vat : ( CIF + CIF * 40% ) * 18%</p>
                <p>
                    Other levies: cess / SSCL / SCL not applicable for these HS
                    codes
                </p>
                <p className="text-lg font-semibold mt-6">
                    Total : CIF + Custom Duty + Excise Duty + Vat + LuxuryTax
                </p>
            </div>
            {finalResult !== null && (
                <div
                    ref={resultRef}
                    className=" relative w-full mb-8 p-4 border border-secondary rounded-md"
                >
                    <BorderBeam />
                    <div className="text-sm font-normal grid grid-cols-2">
                        <p>CIF : </p>
                        <p>
                            {Intl.NumberFormat("en-SI", {
                                style: "currency",
                                currency: "LKR",
                            }).format(Number(finalResult.cifVal))}
                        </p>
                    </div>
                    <div className="text-sm font-normal grid grid-cols-2">
                        <p>Excise duty : </p>
                        <p>
                            {Intl.NumberFormat("en-SI", {
                                style: "currency",
                                currency: "LKR",
                            }).format(finalResult.exciseDuty)}
                        </p>
                    </div>
                    <div className="text-sm font-normal grid grid-cols-2">
                        <p>Custom Duty : </p>
                        <p>
                            {Intl.NumberFormat("en-SI", {
                                style: "currency",
                                currency: "LKR",
                            }).format(finalResult.customDuty)}
                        </p>
                    </div>
                    <div className="text-sm font-normal grid grid-cols-2">
                        <p>Luxury Tax : </p>
                        <p>
                            {Intl.NumberFormat("en-SI", {
                                style: "currency",
                                currency: "LKR",
                            }).format(finalResult.luxuryTax)}
                        </p>
                    </div>
                    <div className="text-sm font-normal grid grid-cols-2">
                        <p>Vat : </p>
                        <p>
                            {Intl.NumberFormat("en-SI", {
                                style: "currency",
                                currency: "LKR",
                            }).format(finalResult.vat)}
                        </p>
                    </div>
                    <div className="text-sm font-normal grid grid-cols-2">
                        <p>Final Price:</p>
                        <p>
                            {Intl.NumberFormat("en-SI", {
                                style: "currency",
                                currency: "LKR",
                            }).format(finalResult.final)}
                        </p>
                    </div>
                    <div className="text-lg font-semibold text-emerald-500 grid grid-cols-2">
                        <p>Price ~:</p>
                        <p>
                            {Intl.NumberFormat("en-SI", {
                                style: "currency",
                                currency: "LKR",
                                notation: "compact",
                            }).format(finalResult.final)}
                        </p>
                    </div>
                    <div className="text-sm  grid grid-cols-2">
                        <p>Old tax ~:</p>
                        <p>
                            {Intl.NumberFormat("en-SI", {
                                style: "currency",
                                currency: "LKR",
                                notation: "compact",
                            }).format(finalResult.oldPrice)}
                        </p>
                    </div>
                    <div className="text-sm text-sky-700 grid grid-cols-2">
                        <p>Tax increase ~:</p>
                        <p>{finalResult.increase.toFixed(2)} %</p>
                    </div>
                    <div className="text-sm  grid grid-cols-2">
                        <p>Total tax ~:</p>
                        <p>
                            {Intl.NumberFormat("en-SI", {
                                style: "currency",
                                currency: "LKR",
                                notation: "compact",
                            }).format(finalResult.totalTax)}
                        </p>
                    </div>
                </div>
            )}

            <h2 className="text-3xl  font-bold mb-8 flex items-center gap-2">
                Unit references (2025)
                <Download
                    className="w-8 h-8 text-primary cursor-pointer hover:text-primary/80 transition-colors"
                    aria-label="reference table source of truth"
                    onClick={handleDownload}
                />
            </h2>
            <div className="my-8 border border-secondary p-8 rounded-md">
                <div className="grid grid-cols-1 wrap gap-4 md:gap-8 justify-between  md:grid-cols-2 ">
                    {informationSections.map((info) => (
                        <div key={info.name}>
                            <h3 className="text-2xl font-semibold">
                                {info.name}
                            </h3>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            Engine capacity (cc)
                                        </TableHead>
                                        <TableHead>Unit price</TableHead>
                                        <TableHead>Max engine tax</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {info.values.map((row, index) => (
                                        <TableRow
                                            className={` ${
                                                row?.highlight
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                            key={index}
                                        >
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
                                            <TableCell>
                                                {Intl.NumberFormat("en-SI", {
                                                    style: "currency",
                                                    currency: "LKR",
                                                    notation: "standard",
                                                    currencyDisplay:
                                                        "narrowSymbol",
                                                    maximumFractionDigits: 0,
                                                    minimumFractionDigits: 0,
                                                }).format(row?.maxTax ?? 0)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ))}
                </div>
            </div>

            {/* <h1 className="text-3xl font-bold mb-8">Already known prices</h1>

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
                                        })
                                            .format(car.price)
                                            .replaceAll(",", ".")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ))} */}
        </div>
    );
}
