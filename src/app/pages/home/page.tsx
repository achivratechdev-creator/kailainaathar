import Image from "next/image";
import Link from "next/link";
import DiseaseList from "@/components/diseaselist/diseaselist";
export default function Home() {
  return (
    <>

          <section className="relative w-full bg-[rgba(240,253,244,0.5)] overflow-hidden">
              {/* Background image */}
              <div className="absolute inset-0 opacity-10">
                  <img
                      src="/assets/img/b16d150fcce52c68270d1908e5da785b356eaa48.png"
                      alt=""
                      className="w-full h-full object-cover"
                  />
              </div>

              <div className="relative max-w-[1280px] mx-auto flex flex-col items-center justify-center px-4 py-32 sm:py-48">
                  {/* Heading */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center font-[Arima] leading-tight text-gray-800">
                      Thiru Kailainaadhar Siddha Clinic
                  </h1>
                  <p className="text-2xl sm:text-3xl md:text-3xl font-normal text-center font-[Arima] mt-2 leading-snug text-gray-800">
                      Govt. Reg. No: C.Ε. 36314
                  </p>

                  {/* Subheading */}
                  <p className="text-lg sm:text-xl font-semibold text-[#2e7d32] text-center mt-4">
                      15 Years of Trusted Siddha Care
                  </p>

                  {/* Description */}
                  <div className="text-center text-gray-600 font-light text-base sm:text-lg max-w-xl mt-6 space-y-1">
                      <p>Holistic healing through traditional Pulse Diagnosis & Herbal</p>
                      <p>Medicines.</p>
                      <p className="mt-2">We also offer premium Siddha medicine products.</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                      <Link href="/#bookAppointment">
                      <button className="bg-[#2e7d32] text-white font-bold px-8 py-3 rounded-full hover:bg-[#256629] transition-all duration-200 active:scale-95">
                          Book Appointment
                      </button>
                      </Link>
                      <Link href="/products">
                      <button className="bg-white border-2 border-[#2e7d32] text-[#2e7d32] font-bold px-8 py-3 rounded-full hover:bg-[#f0fdf4] transition-all duration-200 active:scale-95">
                          Shop Now
                      </button>
                      </Link>
                  </div>
              </div>
          </section>

          <section className="bg-white py-16 px-4 sm:px-8 md:px-20">
              <div className="max-w-[1280px] mx-auto">
                  {/* Heading */}
                  <div className="flex flex-col items-center gap-2 mb-12">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center font-[Poppins] leading-snug">
                          Our Siddha Essentials
                      </h2>
                      <p className="text-lg sm:text-xl text-[#2e7d32] font-semibold text-center font-[Poppins]">
                          Premium quality Siddha medicine products
                      </p>
                      <div className="bg-green-500 h-1 w-24 rounded mt-2"></div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      {/* Product Card */}
                      {[
                          {
                              id:'1',
                              img: "/Neelibringadi Kera Thailam.png",
                              label: "Herbal Oils",
                              title: "Neelibringadi Kera Thailam",
                              desc: "Traditional hair oil for healthy hair growth",
                              price: "₹450",
                          },
                          {
                              id:'2',
                              img: "/Triphala Choornam.png",
                              label: "Powders",
                              title: "Triphala Choornam",
                              desc: "Triple fruit powder for digestive health",
                              price: "₹180",
                          },
                          {
                              id:'3',
                              img: "/Ashwagandha Tablets.png",
                              label: "Medicines",
                              title: "Ashwagandha Tablets",
                              desc: "Stress relief and energy booster",
                              price: "₹320",
                          },
                      ].map((product, index) => (
                        
                          <div
                              id={`product-${index}`} key={product.id}
                              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                          >
                              <div className="relative h-64 overflow-hidden bg-gray-50">
                                  <Image fill
                                      src={product.img}
                                      alt={product.title}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                  <div className="absolute top-3 right-3 bg-[#2e7d32] text-white px-3 py-1 rounded-full text-sm font-[Poppins]">
                                      {product.label}
                                  </div>
                              </div>
                              <div className="p-4 sm:p-6">
                                  <h3 className="text-gray-800 mb-2 font-medium font-[Poppins] text-left">{product.title}</h3>
                                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-[Poppins] text-left">{product.desc}</p>
                                  <div className="mb-4 text-left">
                                      <span className="text-[#2e7d32] font-bold font-[Poppins]">{product.price}</span>
                                  </div>
                                  <Link href={`/product/${product.id}`}><button className="w-full bg-[#2e7d32] text-white py-3 rounded-lg font-medium hover:bg-[#256629] transition-all duration-200 active:scale-95 font-[Poppins]">View Details</button>{``}</Link>
                              </div>
                          </div>
                      ))}
                  </div>

                  {/* View All Button */}
                  <div className="text-center">
                      <Link href="/products">
                      <button className="bg-white border-2 border-[#2e7d32] text-[#2e7d32] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-[Poppins] font-medium hover:bg-[#f0fdf4] transition-all duration-200 active:scale-95 shadow-md hover:shadow-xl">
                          View All Products
                      </button>
                      </Link>
                  </div>
              </div>
          </section>

          <section id="aboutSiddha" className="bg-white py-16 px-4 sm:px-8 md:px-20">
              <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
                  {/* Heading */}
                  <div className="flex flex-col items-center gap-2">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center font-[Poppins] leading-snug">
                          About Our Clinic
                      </h2>
                      <p className="text-lg sm:text-xl text-[#2e7d32] font-semibold text-center font-[Poppins]">
                          A trusted institution with 15 years of experience
                      </p>
                      <div className="bg-green-500 h-1 w-24 rounded mt-2"></div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                      {/* Image with overlay */}
                      <div className="relative w-full md:w-1/2">
                          <div className="aspect-[584/357.75] rounded-lg shadow-xl overflow-hidden">
                              <img
                                  src="/assets/img/d579a952d4098e8bc1dabb2baa16607f5b3976ac.png"
                                  alt="Siddha herbs"
                                  className="w-full h-full object-cover"
                              />
                          </div>
                          <div className="mx-auto md:mx-0 mt-4 md:mt-0 md:absolute md:bottom-[-16px] right-0 md:right-[-16px] bg-[#2e7d32] w-44 p-6 rounded-lg shadow-lg flex flex-col items-center gap-2">
                              <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48">
                                  <path
                                      d="M34 16C16 20 11.8 32.34 7.64 42.68L11.42 44C15.88 33.62 24 24 34 16Z"
                                      fill="white"
                                      fillOpacity="0.8"
                                  />
                                  <path
                                      d="M34 16C34 11.58 30.42 8 26 8C21.58 8 18 11.58 18 16C18 17.48 18.42 18.84 19.14 20.06C22.46 22.4 26.12 20 34 16Z"
                                      fill="white"
                                      fillOpacity="0.8"
                                  />
                              </svg>
                              <div className="text-white text-center font-bold text-sm sm:text-base font-[Poppins] leading-tight">
                                  <p>Pulse Diagnosis</p>
                                  <p>& Herbal</p>
                                  <p>Medicines</p>
                              </div>
                          </div>
                      </div>

                      {/* Text */}
                      <div className="flex flex-col gap-6 w-full md:w-1/2">
                          <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-[Poppins]">
                              Welcome to Thiru Kailainaadhar Siddha Clinic, a sanctuary of traditional healing. We are
                              dedicated to providing authentic Siddha treatment, rooted in ancient wisdom and tailored
                              to modern lifestyles.
                          </p>
                          <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-[Poppins]">
                              Our primary diagnostic method is Nadi Parikshanai (Pulse Diagnosis), an accurate,
                              non-invasive technique to understand the root cause of ailments. Based on this, we
                              provide personalized treatments with pure herbal medicines.
                          </p>
                          <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-[Poppins]">
                              Our mission is to restore health and harmony, helping you lead a balanced and vibrant life.
                          </p>
                      </div>
                  </div>
              </div>
          </section>

        {/* treatments yet to add */}
          <div id="treatments" className="bg-white w-full relative">
              <div className="max-w-[1280px] mx-auto w-full px-4 py-8 flex flex-col items-center">
                  <div className="flex flex-col items-center gap-3 w-full max-w-md text-center">
                      <h2 className="font-poppins font-bold text-gray-800 text-[2.25rem] leading-[2.5rem] w-full">
                          Our Treatments
                      </h2>
                      <p className="font-poppins font-light text-gray-600 text-[1.125rem] leading-7 whitespace-normal">
                          We provide specialized treatment for the following conditions:
                      </p>
                      <div className="bg-green-500 h-1 rounded w-24 mx-auto"></div>
                  </div>

                  <div className="mt-8 flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center">
                      {/* <div className="flex flex-col gap-4 items-start w-full md:w-1/2">
                          Left Column Items
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
                                  Asthma
                              </p>
                          </div>
                          Add more left column items here similarly
                      </div>

                      <div className="flex flex-col gap-4 items-start w-full md:w-1/2">
                          Right Column Items
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
                                  Shoulder Pain
                              </p>
                          </div>
                          Add more right column items here similarly
                      </div> */}
                      <DiseaseList/>
                  </div>
              </div>
          </div>
        {/* treatments yet to add */}
        
          <section id="specialTreatments" className="bg-[rgba(240,253,244,0.5)] py-16 px-4 sm:px-8 md:px-20">
              <div className="max-w-[1280px] mx-auto flex flex-col gap-12 items-center">
                  {/* Heading */}
                  <div className="flex flex-col items-center gap-2">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center font-[Poppins] leading-snug">
                          Special Therapies
                      </h2>
                      <p className="text-lg sm:text-xl text-gray-600 font-light text-center font-[Poppins]">
                          In addition to medicines, we offer traditional therapeutic procedures.
                      </p>
                      <div className="bg-green-500 h-1 w-24 rounded mt-2"></div>
                  </div>

                  {/* Therapy Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                      {/* Varmam */}
                      <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 hover:shadow-xl transition-transform cursor-pointer border-l-4 border-[#2e7d32]">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 font-[Poppins]">Varmam</h3>
                          <p className="text-gray-600 text-base leading-relaxed font-[Poppins]">
                              A traditional art of vital points stimulation for healing chronic pain and blockages.
                          </p>
                      </div>

                      {/* Thokkanam */}
                      <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 hover:shadow-xl transition-transform cursor-pointer border-l-4 border-[#2e7d32]">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 font-[Poppins]">Thokkanam</h3>
                          <p className="text-gray-600 text-base leading-relaxed font-[Poppins]">
                              A specialized Siddha massage therapy to rejuvenate muscles and joints.
                          </p>
                      </div>

                      {/* Uterus Problems */}
                      <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 hover:shadow-xl transition-transform cursor-pointer border-l-4 border-[#2e7d32]">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 font-[Poppins]">Uterus Problems</h3>
                          <p className="text-gray-600 text-base leading-relaxed font-[Poppins]">
                              Holistic care for various uterine and gynecological issues.
                          </p>
                      </div>

                      {/* Gallbladder Stones */}
                      <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 hover:shadow-xl transition-transform cursor-pointer border-l-4 border-[#2e7d32]">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 font-[Poppins]">Gallbladder Stones</h3>
                          <p className="text-gray-600 text-base leading-relaxed font-[Poppins]">
                              Non-surgical management and treatment for gallbladder stones.
                          </p>
                      </div>

                      {/* Infertility */}
                      <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 hover:shadow-xl transition-transform cursor-pointer border-l-4 border-[#2e7d32]">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 font-[Poppins]">Infertility</h3>
                          <p className="text-gray-600 text-base leading-relaxed font-[Poppins]">
                              Specialized care for both male and female infertility issues, aiming to restore natural fertility.
                          </p>
                      </div>
                  </div>

                  {/* Monthly Special Procedures */}
                  <div className="bg-white rounded-lg shadow-md p-8 mt-12 w-full max-w-3xl relative border-t-4 border-[#d4af37]">
                      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4 font-[Poppins]">
                          Monthly Special Procedures
                      </h3>
                      <div className="flex flex-col gap-4 text-center text-gray-700 font-[Poppins] text-base leading-relaxed">
                          <p>On the 1st & 3rd Sunday of every month, Kalikkam (medicated eye drops) will be administered.</p>
                          <p>On the 2nd & 4th Sunday of every month, Nasyam (nasal therapy) will be administered.</p>
                      </div>
                  </div>
              </div>
          </section>

          <section id="doctors" className="bg-[rgba(240,253,244,0.5)] py-16 px-4 sm:px-8 md:px-20">
              <div className="max-w-[1280px] mx-auto flex flex-col gap-12 items-center">

                  {/* Heading */}
                  <div className="flex flex-col items-center gap-2">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center font-[Poppins] leading-snug">
                          Our Expert Doctors
                      </h2>
                      <div className="bg-green-500 h-1 w-24 rounded mt-2"></div>
                  </div>

                  {/* Doctor Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 w-full max-w-4xl">

                      {/* Doctor 1 */}
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition-transform cursor-pointer">
                          <div className="relative h-80 w-full">
                              <Image fill
                                  src="/assets/img/11cd2cbb94470c59336bbf30fc83322c5492002b.png"
                                  alt="Dr. P. Gowrishankar"
                                  className="absolute inset-0 w-full h-full object-cover"
                              />
                          </div>
                          <div className="p-6 flex flex-col items-center">
                              <h3 className="text-2xl font-bold text-gray-800 mb-1 font-[Poppins] text-center">
                                  Dr. P. Gowrishankar
                              </h3>
                              <p className="text-[#2e7d32] font-semibold text-lg text-center font-[Poppins]">
                                  MD (AM), MA (ASTRO)
                              </p>
                          </div>
                      </div>

                      {/* Doctor 2 */}
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition-transform cursor-pointer">
                          <div className="relative h-80 w-full">
                              <Image fill
                                  src="/assets/img/864265a52c294cbe998807a5dbd719aa563a7c37.png"
                                  alt="Dr. J. Kalaivani"
                                  className="absolute inset-0 w-full h-full object-cover"
                              />
                          </div>
                          <div className="p-6 flex flex-col items-center">
                              <h3 className="text-2xl font-bold text-gray-800 mb-1 font-[Poppins] text-center">
                                  Dr. J. Kalaivani
                              </h3>
                              <p className="text-[#2e7d32] font-semibold text-lg text-center font-[Poppins]">
                                  B.S.M.S., Govt. Reg. No: 4705
                              </p>
                          </div>
                      </div>

                  </div>
              </div>
          </section>

        {/* Patient stories yet to add */}
          <div className="bg-white relative w-full" data-name="Section">
              <div className="w-full">
                  <div
                      className="box-border content-stretch flex flex-col sm:items-start md:items-center p-6 md:p-12 lg:p-20 relative w-full">
                      <div className="max-w-[1280px] mx-auto relative w-full" data-name="Container">
                          <div className="flex flex-col items-center justify-center max-w-inherit w-full">
                              <div
                                  className="box-border content-stretch flex flex-col gap-8 md:gap-12 items-center justify-center max-w-inherit px-4 md:px-8 py-0 relative w-full">
                                  <div className="box-border content-stretch flex flex-col gap-2 items-center pb-[6.4px] pt-0 px-0 relative shrink-0 w-full"
                                      data-name="Container">
                                      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full"
                                          data-name="Heading 2">
                                          <div
                                              className="flex flex-col font-['Poppins',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-2xl md:text-[36px] text-center text-gray-800 w-full">
                                              <p className="leading-[40px]">Patient Stories</p>
                                          </div>
                                      </div>
                                      <div className="box-border content-stretch flex flex-col items-center pb-2 pt-0 px-0 relative shrink-0 w-full"
                                          data-name="Container">
                                          <div
                                              className="flex flex-col font-['Poppins',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-base md:text-[18px] text-center text-gray-600 w-full">
                                              <p className="leading-[28px]">What our patients say about us.</p>
                                          </div>
                                      </div>
                                      <div className="bg-green-500 h-[4px] rounded-[4px] shrink-0 w-[96px]"
                                          data-name="Background"></div>
                                  </div>
                                  <div className="content-stretch flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-stretch justify-center relative w-full"
                                      data-name="Container">
                                      <div className="w-full md:w-auto flex justify-center">
                                          <div className="bg-[rgba(240,253,244,0.7)] box-border flex flex-col items-start overflow-clip p-6 md:p-8 relative rounded-lg shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] w-full max-w-[359px] transition-all duration-300 hover:scale-105 hover:shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.15),0px_8px_10px_-6px_rgba(0,0,0,0.15)] cursor-pointer"
                                              data-name="Overlay+Shadow">
                                              <div className="box-border flex flex-col items-start pb-4 pt-0 px-0 relative w-full"
                                                  data-name="Margin">
                                                  <div className="content-stretch flex items-start relative shrink-0 w-full"
                                                      data-name="Container">
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                  </div>
                                              </div>
                                              <div className="box-border flex flex-col flex-1 items-start justify-center pb-6 pt-0 px-0 relative w-full"
                                                  data-name="Margin">
                                                  <div className="flex flex-col items-start relative w-full"
                                                      data-name="Container">
                                                      <div
                                                          className="flex flex-col font-['Poppins',sans-serif] italic justify-center leading-[24px] relative text-[16px] text-gray-600 w-full">
                                                          <p>Excellent treatment. My long-term sinus problem
                                                              was cured in a few months. The doctor explains
                                                              the issue very clearly. Highly recommended.</p>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="flex flex-col items-end relative w-full"
                                                  data-name="Container">
                                                  <div
                                                      className="flex flex-col font-['Poppins',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[16px] text-green-800 text-right w-full">
                                                      <p className="leading-[24px]">- Sathish Kumar</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="w-full md:w-auto flex justify-center">
                                          <div className="bg-[rgba(240,253,244,0.7)] box-border flex flex-col items-start overflow-clip p-6 md:p-8 relative rounded-lg shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] w-full max-w-[359px] transition-all duration-300 hover:scale-105 hover:shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.15),0px_8px_10px_-6px_rgba(0,0,0,0.15)] cursor-pointer"
                                              data-name="Overlay+Shadow">
                                              <div className="box-border flex flex-col items-start pb-4 pt-0 px-0 relative w-full"
                                                  data-name="Margin">
                                                  <div className="content-stretch flex items-start relative shrink-0 w-full"
                                                      data-name="Container">
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                  </div>
                                              </div>
                                              <div className="box-border flex flex-col flex-1 items-start justify-center pb-6 pt-0 px-0 relative w-full"
                                                  data-name="Margin">
                                                  <div className="flex flex-col items-start relative w-full"
                                                      data-name="Container">
                                                      <div
                                                          className="flex flex-col font-['Poppins',sans-serif] italic justify-center leading-[24px] relative text-[16px] text-gray-600 w-full">
                                                          <p>I had severe knee pain for years. After taking
                                                              treatment here, I feel a huge relief. Dr.
                                                              Kalaivani is very patient and the Varmam therapy
                                                              was very effective.</p>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="flex flex-col items-end relative w-full"
                                                  data-name="Container">
                                                  <div
                                                      className="flex flex-col font-['Poppins',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[16px] text-green-800 text-right w-full">
                                                      <p className="leading-[24px]">- Priya M</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="w-full md:w-auto flex justify-center">
                                          <div className="bg-[rgba(240,253,244,0.7)] box-border flex flex-col items-start overflow-clip p-6 md:p-8 relative rounded-lg shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] w-full max-w-[359px] transition-all duration-300 hover:scale-105 hover:shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.15),0px_8px_10px_-6px_rgba(0,0,0,0.15)] cursor-pointer"
                                              data-name="Overlay+Shadow">
                                              <div className="box-border flex flex-col items-start pb-4 pt-0 px-0 relative w-full"
                                                  data-name="Margin">
                                                  <div className="content-stretch flex items-start relative shrink-0 w-full"
                                                      data-name="Container">
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                      <div className="relative shrink-0 size-[20px]"
                                                          data-name="Component 2"><svg className="block size-full"
                                                              fill="none" preserveAspectRatio="none"
                                                              viewBox="0 0 20 20">
                                                              <g id="Component 2">
                                                                  <path clipRule="evenodd"
                                                                      d="M8.99 2.675C9.36333 1.7775 10.6367 1.7775 11.01 2.675L12.745 6.8475L17.2483 7.20833C18.2183 7.28583 18.6117 8.49583 17.8725 9.12917L14.4417 12.0683L15.4892 16.4625C15.715 17.4092 14.6858 18.1567 13.8558 17.65L10 15.295L6.14417 17.65C5.31417 18.1567 4.285 17.4083 4.51083 16.4625L5.55833 12.0683L2.1275 9.12917C1.38833 8.49583 1.78167 7.28583 2.75167 7.20833L7.255 6.8475L8.99 2.675Z"
                                                                      fill="var(--fill-0, #EAB308)"
                                                                      fillRule="evenodd" id="Vector"></path>
                                                              </g>
                                                          </svg></div>
                                                  </div>
                                              </div>
                                              <div className="box-border flex flex-col flex-1 items-start justify-center pb-6 pt-0 px-0 relative w-full"
                                                  data-name="Margin">
                                                  <div className="flex flex-col items-start relative w-full"
                                                      data-name="Container">
                                                      <div
                                                          className="flex flex-col font-['Poppins',sans-serif] italic justify-center leading-[24px] relative text-[16px] text-gray-600 w-full">
                                                          <p>Good place for traditional Siddha medicine. They
                                                              correctly identified my problem through pulse
                                                              diagnosis and the herbal medicines worked
                                                              wonders for my digestion.</p>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="flex flex-col items-end relative w-full"
                                                  data-name="Container">
                                                  <div
                                                      className="flex flex-col font-['Poppins',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[16px] text-green-800 text-right w-full">
                                                      <p className="leading-[24px]">- Rajendran P</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        {/* Patient stories yet to add */}

          <section id="gallery" className="bg-[rgba(240,253,244,0.5)] py-16 px-4 sm:px-8 md:px-20">
              <div className="max-w-[1280px] mx-auto flex flex-col gap-12 items-center">

                  {/* Heading */}
                  <div className="flex flex-col items-center gap-2">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center font-[Poppins] leading-snug">
                          Image Gallery
                      </h2>
                      <p className="text-gray-600 text-lg sm:text-xl text-center font-[Poppins]">
                          Browse our latest images.
                      </p>
                      <div className="bg-green-500 h-1 w-24 rounded mt-2"></div>
                  </div>

                  {/* Image Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">

                      {/* Gallery Image 1 */}
                      <div className="overflow-hidden rounded-lg shadow-md cursor-pointer group">
                          <img
                              src="/assets/img/cc945033eb213091e044fb882f7194e6a604ee87.png"
                              alt="Gallery Image 1"
                              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                      </div>

                      {/* Gallery Image 2 */}
                      <div className="overflow-hidden rounded-lg shadow-md cursor-pointer group">
                          <img
                              src="/assets/img/578f866fb5d77829a652412c2f97a7c5cedf1fc5.png"
                              alt="Gallery Image 2"
                              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                      </div>

                      {/* Gallery Image 3 */}
                      <div className="overflow-hidden rounded-lg shadow-md cursor-pointer group">
                          <img
                              src="/assets/img/b0b0a05327bf32039b8dfbcfe660300763924db6.png"
                              alt="Gallery Image 3"
                              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                      </div>

                      {/* Gallery Image 4 */}
                      <div className="overflow-hidden rounded-lg shadow-md cursor-pointer group">
                          <img
                              src="/assets/img/9d50477f20152e055ca78a556a1d15715338b3de.png"
                              alt="Gallery Image 4"
                              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                      </div>

                      {/* Gallery Image 5 */}
                      <div className="overflow-hidden rounded-lg shadow-md cursor-pointer group">
                          <img
                              src="/assets/img/a33c46f7605851bb7462685a781a29d9c5a10b21.png"
                              alt="Gallery Image 5"
                              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                      </div>

                  </div>
              </div>
          </section>

          <section id="license" className="bg-[rgba(240,253,244,0.5)] py-16 px-4 sm:px-8 md:px-20">
              <div className="max-w-[1280px] mx-auto flex flex-col gap-12 items-center">

                  {/* Heading */}
                  <div className="flex flex-col items-center gap-2">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center font-[Poppins] leading-snug">
                          Our License
                      </h2>
                      <p className="text-gray-600 text-lg sm:text-xl text-center font-[Poppins]">
                          View our official registrations and certificates. Click on a certificate to enlarge it.
                      </p>
                      <div className="bg-blue-500 h-1 w-24 rounded mt-2"></div>
                  </div>

                  {/* Certificate Card */}
                  <div className="w-full max-w-sm">
                      <div className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">

                          {/* Certificate Image */}
                          <img
                              src="/assets/img/f4a553e7eeae725ac99d8209f35ba955be60d55b.png"
                              alt="Clinical Establishment"
                              className="w-full h-96 object-contain p-4"
                          />

                          {/* Overlay Label */}
                          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3 text-center">
                              <span className="text-gray-800 font-semibold text-lg sm:text-xl font-[Poppins]">
                                  Clinical Establishment Registration
                              </span>
                          </div>
                      </div>
                  </div>

              </div>
          </section>

          <div className="bg-white relative w-full" id="bookAppointment" data-name="Section">
              <div className="w-full">
                  <div className="flex flex-col items-center md:items-center p-6 md:p-20 w-full relative">
                      <div className="w-full max-w-[1280px] mx-auto relative">
                          <div className="flex flex-col items-center w-full gap-8 px-4">

                              {/* Heading Section */}
                              <div className="flex flex-col gap-2 items-center w-full max-w-md text-center">
                                  <h2 className="font-poppins font-bold text-2xl md:text-3xl text-gray-800 leading-snug">
                                      Book an Appointment
                                  </h2>
                                  <p className="font-poppins font-light text-base md:text-lg text-gray-600 leading-relaxed">
                                      Take the first step towards better health. Fill out the form or call us directly.
                                  </p>
                              </div>

                              {/* Form Container */}
                              <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8 relative">
                                  <form className="flex flex-col gap-4 w-full">
                                      {/* Name Input */}
                                      <div className="relative w-full">
                                          <input
                                              type="text"
                                              name="name"
                                              placeholder="Your Name"
                                              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 font-poppins placeholder-gray-400 outline-none"
                                          />
                                      </div>

                                      {/* Phone Input */}
                                      <div className="relative w-full">
                                          <input
                                              type="tel"
                                              name="phone"
                                              placeholder="Your Phone Number"
                                              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 font-poppins placeholder-gray-400 outline-none"
                                          />
                                      </div>

                                      {/* Date Picker Button */}
                                      <div className="relative w-full">
                                          <button
                                              type="button"
                                              className="w-full text-left px-4 py-3 border border-gray-300 rounded-md text-gray-800 font-poppins bg-transparent"
                                          >
                                              Select appointment date
                                          </button>
                                      </div>

                                      {/* Submit Button */}
                                      <button
                                          type="submit"
                                          className="w-full bg-green-700 text-white font-medium py-3 rounded-md shadow hover:bg-green-800 transition-colors"
                                      >
                                          Request Appointment
                                      </button>
                                  </form>

                                  {/* Decorative Shadow/Border */}
                                  <div className="absolute inset-0 border-t-4 border-green-700 rounded-lg shadow-xl pointer-events-none"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div id="contact" className="bg-[rgba(240,253,244,0.5)] w-full relative">
              <div className="flex flex-col md:items-center p-4 sm:p-8 md:p-20 w-full">

                  <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-12">

                      {/* Heading */}
                      <div className="flex flex-col items-center w-full gap-2 text-center">
                          <h2 className="font-poppins font-bold text-xl sm:text-2xl md:text-3xl text-gray-800 leading-snug">
                              Contact Us
                          </h2>
                          <p className="font-poppins font-light text-base sm:text-lg text-gray-600 leading-relaxed">
                              Get In Touch
                          </p>
                          <div className="bg-green-500 h-1 w-24 rounded"></div>
                      </div>

                      {/* Content Area */}
                      <div className="flex flex-col md:flex-row gap-8 w-full">

                          {/* Contact Card */}
                          <div className="bg-white rounded-lg shadow p-6 sm:p-8 flex flex-col gap-8 w-full md:w-[592px]">

                              {/* Address */}
                              <div className="flex items-start gap-4">
                                  <svg
                                      className="w-8 h-8 text-green-700"
                                      fill="none"
                                      viewBox="0 0 32 32"
                                      stroke="#2E7D32"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                  >
                                      <path d="M26.6667 11.3333C26.6667 18.6667 16 27.3333 16 27.3333C16 27.3333 5.33333 18.6667 5.33333 11.3333C5.33333 8.50812 6.45714 5.79851 8.45753 3.79812C10.4579 1.79772 13.1675 0.666664 16 0.666664C18.8325 0.666664 21.5421 1.79772 23.5425 3.79812C25.5429 5.79851 26.6667 8.50812 26.6667 11.3333Z" />
                                      <path d="M16 14.6667C17.841 14.6667 19.3333 13.1743 19.3333 11.3333C19.3333 9.49238 17.841 8 16 8C14.159 8 12.6667 9.49238 12.6667 11.3333C12.6667 13.1743 14.159 14.6667 16 14.6667Z" />
                                  </svg>
                                  <div className="flex flex-col">
                                      <h3 className="font-poppins font-bold text-lg text-gray-800">Our Address</h3>
                                      <p className="font-poppins font-light text-base text-gray-600">
                                          1/77, Velappa Complex,<br />
                                          Kottaimedu Bypass,<br />
                                          Kumarapalayam - 638 183, Tamil Nadu.
                                      </p>
                                  </div>
                              </div>

                              {/* Phone */}
                              <div className="flex items-start gap-4">
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-8 h-8 text-green-700"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="#2E7D32"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                  >
                                      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                                  </svg>
                                  <div className="flex flex-col">
                                      <h3 className="font-poppins font-bold text-lg text-gray-800">Phone</h3>
                                      <p className="font-poppins font-light text-base text-gray-600">90926 68989, 90928 98966</p>
                                  </div>
                              </div>

                              {/* Hours */}
                              <div className="flex items-start gap-4">
                                  <svg
                                      className="w-8 h-8 text-green-700"
                                      fill="none"
                                      viewBox="0 0 32 32"
                                      stroke="#2E7D32"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                  >
                                      <path d="M28 10.6667V21.3333C28 22.3942 27.5786 23.4116 26.8284 24.1618C26.0783 24.9119 25.0609 25.3333 24 25.3333H8C6.93913 25.3333 5.92172 24.9119 5.17157 24.1618C4.42143 23.4116 4 22.3942 4 21.3333V10.6667M28 10.6667C28 9.60581 27.5786 8.5884 26.8284 7.83826C26.0783 7.08811 25.0609 6.66667 24 6.66667H8C6.93913 6.66667 5.92172 7.08811 5.17157 7.83826C4.42143 8.5884 4 9.60581 4 10.6667M28 10.6667L17.8133 17.48C17.2704 17.8567 16.6428 18.0577 16 18.0577C15.3572 18.0577 14.7296 17.8567 14.1867 17.48L4 10.6667" />
                                  </svg>
                                  <div className="flex flex-col">
                                      <h3 className="font-poppins font-bold text-lg text-gray-800">Hours</h3>
                                      <p className="font-poppins font-light text-base text-gray-600">Sun: 10:00 AM - 12:30 PM</p>
                                  </div>
                              </div>
                          </div>

                          {/* Map */}
                          <div className="bg-white rounded-lg shadow overflow-hidden w-full md:w-[592px] h-[280px] sm:h-[360px] md:h-[450px]">
                              <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.7267944985746!2d77.4897!3d11.4397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDI2JzIzLjAiTiA3N8KwMjknMjMuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                                  allowFullScreen
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                  title="Clinic Location"
                                  className="w-full h-full border-0"
                              ></iframe>
                          </div>

                      </div>
                  </div>

              </div>
          </div>


    </>
  );
}

