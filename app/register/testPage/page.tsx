"use client";

import React from 'react'
import { useState, useEffect } from 'react';

interface Province {
    id: number;
    name_th: string;
    name_en: string;
    geography_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
}

interface Amphure {
    id: number;
    name_th: string;
    name_en: string;
    province_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
}

interface Tambon {
    id: number;
    zip_code: number;
    name_th: string;
    name_en: string;
    amphure_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
}

function TestPage() {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [amphures, setAmphures] = useState<Amphure[]>([]);
    const [tambons, setTambons] = useState<Tambon[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<number>(0);
    const [selectedAmphure, setSelectedAmphure] = useState<number>(0);
    const [selectedTambon, setSelectedTambon] = useState<number>(0);


    useEffect(() => {
        const fetchData = async () => {
            const provinceRes = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json');
            const amphureRes = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json');
            const tambonRes = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json');

            const provinceData: Province[] = await provinceRes.json();
            const amphureData: Amphure[] = await amphureRes.json();
            const tambonData: Tambon[] = await tambonRes.json();

            setProvinces(provinceData);
            setAmphures(amphureData);
            setTambons(tambonData);
        };

        fetchData();
    }, []);

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProvince(parseInt(e.target.value));
    };

    const handleAmphureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAmphure(parseInt(e.target.value));
        setSelectedTambon(0);
    };

    const handleTambonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTambon(parseInt(e.target.value));
    };


    return (
        <div>
            <h4>ที่อยู่</h4>
            <div>
    <input type="text" className="searchbar" style={{fontSize: '18px'}} placeholder="ใส่บ้านเลขและหมู่ที่นี่" />
  </div>
  <h4>จังหวัด</h4>
            <select
                name="provinces"
                className="selectpillboxbar"
                id="provinces"
                value={selectedProvince}
                onChange={handleProvinceChange}
            >
                <option value="0">เลือกจังหวัด</option>
                {provinces
                    .slice()
                    .sort((a, b) => a.name_th.localeCompare(b.name_th))
                    .map((province) => (
                        <option key={province.id} value={province.id}>
                            {province.name_th}
                        </option>
                    ))}
            </select>
            <h4>ตำบล</h4>
            <select
                name="amphures"
                className="selectpillboxbar"
                id="amphures"
                value={selectedAmphure}
                onChange={handleAmphureChange}
                disabled={selectedProvince === 0}
            >
                <option value="0">เลือกอำเภอ</option>
                {amphures
                    .filter((amphure) => amphure.province_id === selectedProvince)
                    .slice()
                    .sort((a, b) => a.name_th.localeCompare(b.name_th))
                    .map((amphure) => (
                        <option key={amphure.id} value={amphure.id}>
                            {amphure.name_th}
                        </option>
                    ))}
            </select>
            <h4>อำเภอ</h4>
            <select
                name="tambons"
                className="selectpillboxbar"
                id="tambons"
                value={selectedTambon}
                onChange={handleTambonChange}
                disabled={selectedAmphure === 0}
            >
                <option value="0">เลือกตำบล</option>
                {tambons
                    .filter((tambon) => tambon.amphure_id === selectedAmphure)
                    .slice()
                    .sort((a, b) => a.name_th.localeCompare(b.name_th))
                    .map((tambon) => (
                        <option key={tambon.id} value={tambon.id}>
                            {tambon.name_th} ({tambon.zip_code})
                        </option>
                    ))}
            </select>
        </div>
    );
}

export default TestPage