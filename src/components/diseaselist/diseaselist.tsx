const listItems = [
  "Asthma",
  "Shoulder Pain",
  "Piles",
  "Obesity",
  "Kidney Stones",
  "Skin Diseases",
  "Sinus Allergy",
  "Back Pain",
  "Fistula",
  "Insomnia",
  "Kidney Diseases",
  "Menstrual Problems",
  "Migraine",
  "Knee Pain",
  "Jaundice",
  "Depression",
  "Stomach Ulcer",
  "Heel Pain",
  "Neck Pain",
  "Itching/Allergies",
  "Rheumatism (Saravangi)",
  "Infertility (Male & Female)",
  "Gallbladder Stones",
];

export default function DiseaseList() {
  // BEST approach → split by even/odd index
  const col1 = listItems.filter((_, i) => i % 2 === 0);
  const col2 = listItems.filter((_, i) => i % 2 !== 0);

  return (
    <>
      {/* Column 1 */}
      <div className="flex flex-col gap-4 items-start w-full md:w-1/2">
        {col1.map((item, i) => (
          <ListItem key={i} label={item} />
        ))}
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-4 items-start w-full md:w-1/2">
        {col2.map((item, i) => (
          <ListItem key={i} label={item} />
        ))}
      </div>
    </>
  );
}

function ListItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 w-full">
        <div className="w-5 h-5 shrink-0">
            <svg fill="none" viewBox="0 0 20 20" className="w-full h-full" preserveAspectRatio="none">
                <g>
                    <path d="M14.1667 6.66667C6.66667 8.33333 4.91667 13.475 3.18333 17.7833L4.75833 18.3333C6.61667 14.0083 10 10 14.1667 6.66667Z" fill="#16A34A" />
                    <path d="M14.1667 6.66667C14.1667 4.825 12.675 3.33333 10.8333 3.33333C8.99167 3.33333 7.5 4.825 7.5 6.66667C7.5 7.28333 7.675 7.85 7.975 8.35833C9.35833 9.33333 10.8833 8.33333 14.1667 6.66667Z" fill="#16A34A" />
                </g>
            </svg>
        </div>
        <p className="font-poppins font-normal text-gray-700 text-[1.125rem] leading-7 whitespace-normal">
            {label}
        </p>
    </div>
  );
}
