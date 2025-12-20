import React, { useState } from 'react';
import { 
  Globe, Package, CreditCard, Mail, Shield, Save, Check 
} from 'lucide-react';
import { SettingsState } from '@/types';

// --- 1. Define Interfaces for Props (Fixes "Unexpected any") ---

interface SectionCardProps {
  title: string;
  icon: React.ElementType; // Correct type for a component passed as a prop
  iconColor: string;
  iconBg: string;
  children: React.ReactNode;
}

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
}

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface CheckboxRowProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

// --- 2. Helper Components with Types Applied ---

const SectionCard = ({ 
  title, 
  icon: Icon, 
  iconColor, 
  iconBg, 
  children 
}: SectionCardProps) => (
  <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
    <div className="flex items-center gap-2.5 mb-4">
      <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <h3 className="text-sm text-gray-800 font-medium">{title}</h3>
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const InputField = ({ label, value, onChange, type = "text" }: InputFieldProps) => (
  <div>
    <label className="block text-xs text-gray-700 mb-1.5 font-light">{label}</label>
    <input 
      type={type} 
      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-light text-sm" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const ToggleSwitch = ({ label, checked, onChange }: ToggleSwitchProps) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <label className="text-sm text-gray-800 font-light">{label}</label>
    <div 
      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${checked ? 'bg-[#2e7d32]' : 'bg-gray-300'}`}
      onClick={() => onChange(!checked)}
    >
      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ${checked ? 'left-6' : 'left-1'}`}></div>
    </div>
  </div>
);

const CheckboxRow = ({ label, checked, onChange }: CheckboxRowProps) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-2.5">
      <input 
        type="checkbox" 
        className="w-4 h-4 text-[#2e7d32] rounded focus:ring-[#2e7d32] cursor-pointer" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="text-sm text-gray-800 font-light cursor-pointer" onClick={() => onChange(!checked)}>{label}</label>
    </div>
    <span className={`text-xs font-light ${checked ? 'text-green-600' : 'text-gray-400'}`}>
      {checked ? 'Active' : 'Inactive'}
    </span>
  </div>
);

// --- 3. Main Settings Component ---

export default function SettingsView({ initialSettings }: { initialSettings: SettingsState }) {
  const [formData, setFormData] = useState<SettingsState>(initialSettings);
  const [isSaved, setIsSaved] = useState(false);

  // Helper to update state safely
  const updateField = (section: keyof SettingsState, field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setIsSaved(false); 
  };

  const handleSave = () => {
    console.log("Saving Settings:", formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. General Settings */}
      <SectionCard title="General Settings" icon={Globe} iconColor="text-blue-600" iconBg="bg-blue-100">
        <InputField 
          label="Store Name" 
          value={formData.general.storeName} 
          onChange={(val) => updateField('general', 'storeName', val)} 
        />
        <InputField 
          label="Store Email" 
          value={formData.general.storeEmail} 
          onChange={(val) => updateField('general', 'storeEmail', val)} 
        />
        <InputField 
          label="Store Phone" 
          value={formData.general.storePhone} 
          onChange={(val) => updateField('general', 'storePhone', val)} 
        />
        <div>
          <label className="block text-xs text-gray-700 mb-1.5 font-light">Store Address</label>
          <textarea 
            rows={3} 
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-light text-sm resize-none"
            value={formData.general.storeAddress}
            onChange={(e) => updateField('general', 'storeAddress', e.target.value)}
          />
        </div>
      </SectionCard>

      {/* 2. Shipping Settings */}
      <SectionCard title="Shipping Settings" icon={Package} iconColor="text-purple-600" iconBg="bg-purple-100">
        <InputField 
          label="Free Shipping Above (₹)" 
          type="number"
          value={formData.shipping.freeShippingAbove} 
          onChange={(val) => updateField('shipping', 'freeShippingAbove', parseInt(val) || 0)} 
        />
        <InputField 
          label="Standard Shipping Charge (₹)" 
          type="number"
          value={formData.shipping.standardShipping} 
          onChange={(val) => updateField('shipping', 'standardShipping', parseInt(val) || 0)} 
        />
        <InputField 
          label="Estimated Delivery Days" 
          value={formData.shipping.estimatedDelivery} 
          onChange={(val) => updateField('shipping', 'estimatedDelivery', val)} 
        />
      </SectionCard>

      {/* 3. Payment Gateway */}
      <SectionCard title="Payment Gateway" icon={CreditCard} iconColor="text-green-600" iconBg="bg-green-100">
        <CheckboxRow 
          label="Cash on Delivery" 
          checked={formData.payment.cod} 
          onChange={(val) => updateField('payment', 'cod', val)} 
        />
        <CheckboxRow 
          label="UPI Payment" 
          checked={formData.payment.upi} 
          onChange={(val) => updateField('payment', 'upi', val)} 
        />
        <CheckboxRow 
          label="Credit/Debit Card" 
          checked={formData.payment.card} 
          onChange={(val) => updateField('payment', 'card', val)} 
        />
        <CheckboxRow 
          label="Net Banking" 
          checked={formData.payment.netBanking} 
          onChange={(val) => updateField('payment', 'netBanking', val)} 
        />
      </SectionCard>

      {/* 4. Email Notifications */}
      <SectionCard title="Email Notifications" icon={Mail} iconColor="text-orange-600" iconBg="bg-orange-100">
        <ToggleSwitch 
          label="Order Confirmation Email" 
          checked={formData.email.orderConfirmation} 
          onChange={(val) => updateField('email', 'orderConfirmation', val)} 
        />
        <ToggleSwitch 
          label="Shipping Update Email" 
          checked={formData.email.shippingUpdate} 
          onChange={(val) => updateField('email', 'shippingUpdate', val)} 
        />
        <ToggleSwitch 
          label="Delivery Confirmation Email" 
          checked={formData.email.deliveryConfirmation} 
          onChange={(val) => updateField('email', 'deliveryConfirmation', val)} 
        />
        <ToggleSwitch 
          label="Low Stock Alert Email" 
          checked={formData.email.lowStockAlert} 
          onChange={(val) => updateField('email', 'lowStockAlert', val)} 
        />
      </SectionCard>

      {/* 5. Tax Settings */}
      <SectionCard title="Tax Settings" icon={Shield} iconColor="text-red-600" iconBg="bg-red-100">
        <InputField 
          label="GST Number" 
          value={formData.tax.gstNumber} 
          onChange={(val) => updateField('tax', 'gstNumber', val)} 
        />
        <InputField 
          label="Default Tax Rate (%)" 
          type="number"
          value={formData.tax.taxRate} 
          onChange={(val) => updateField('tax', 'taxRate', parseInt(val) || 0)} 
        />
        <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-lg">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-[#2e7d32] rounded cursor-pointer" 
            checked={formData.tax.includeTax}
            onChange={(e) => updateField('tax', 'includeTax', e.target.checked)}
          />
          <label 
            className="text-sm text-gray-800 font-light cursor-pointer"
            onClick={() => updateField('tax', 'includeTax', !formData.tax.includeTax)}
          >
            Include tax in product prices
          </label>
        </div>
      </SectionCard>

      {/* Save Button */}
      <div className="flex justify-end sticky bottom-4">
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white text-sm rounded-lg hover:shadow-lg transition-all duration-200 font-light shadow-md"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Settings Saved!' : 'Save All Settings'}</span>
        </button>
      </div>

    </div>
  );
}