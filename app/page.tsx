"use client"

import { useMemo, useState } from "react"

type RouteType = {
  from: string
  to: string
  price: string
  time: string
}

export default function CabWebsite() {
  const [pickup, setPickup] = useState("")
  const [drop, setDrop] = useState("")
  const [searchResult, setSearchResult] = useState<RouteType | "not-found" | null>(null)

  const phone = process.env.NEXT_PUBLIC_PHONE
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME

  const routes: RouteType[] = [
    {
      from: "Patna",
      to: "Sheohar",
      price: "₹3500",
      time: "5-6 Hours",
    },
    {
      from: "Patna Airport",
      to: "Sheohar",
      price: "₹3800",
      time: "5-6 Hours",
    },
    {
      from: "Sheohar",
      to: "Patna",
      price: "₹3500",
      time: "5-6 Hours",
    },
  ]

  const cars = [
    {
      name: "Swift Dzire",
      type: "Sedan",
      seats: "4 Seats",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG7PhqJjh7pqzAUjVGIkrNkKW5bXIEY8SOcw&s",
    },
    {
      name: "Ertiga",
      type: "SUV",
      seats: "6 Seats",
      image:
        "https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/IMG20220901WA0009.jpg",
    },
    {
      name: "Innova",
      type: "Premium",
      seats: "7 Seats",
      image:
        "https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/Toyota%20Innova%20Hycross%20Ownership%20review.png",
    },
  ]

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      const pickupMatch = pickup
        ? route.from.toLowerCase().includes(pickup.toLowerCase())
        : true

      const dropMatch = drop
        ? route.to.toLowerCase().includes(drop.toLowerCase())
        : true

      return pickupMatch && dropMatch
    })
  }, [pickup, drop])

  const handleSearch = () => {
    if (filteredRoutes.length > 0) {
      setSearchResult(filteredRoutes[0])
    } else {
      setSearchResult("not-found")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Patna To Sheohar Cab Service
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              24x7 taxi booking service for Patna, Sheohar and nearby cities.
              Safe drivers, affordable pricing and instant booking.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:+${phone}`}
                className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
              >
                Call Now
              </a>

              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                className="border border-white px-6 py-3 rounded-2xl hover:bg-white hover:text-black transition"
              >
                WhatsApp Booking
              </a>
            </div>
          </div>

          <div className="bg-white text-black rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Quick Booking</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Pickup Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="text"
                placeholder="Drop Location"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="date"
                className="w-full border p-3 rounded-xl"
              />

              <button
                onClick={handleSearch}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
              >
                Search Cab
              </button>

              {searchResult && typeof searchResult === "object" && (
                <div className="bg-green-100 border border-green-300 p-4 rounded-xl mt-4">
                  <h3 className="font-bold text-lg mb-2">Cab Found</h3>

                  <p>
                    Route: {searchResult.from} → {searchResult.to}
                  </p>

                  <p>Fare: {searchResult.price}</p>

                  <p>Time: {searchResult.time}</p>

                  <a
                    href={`tel:+${phone}`}
                    className="inline-block mt-3 bg-black text-white px-4 py-2 rounded-lg"
                  >
                    Call Now
                  </a>
                </div>
              )}

              {searchResult === "not-found" && (
                <div className="bg-red-100 border border-red-300 p-4 rounded-xl mt-4">
                  No cab available for this route right now.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Popular Routes</h2>

          <p className="text-gray-600">
            Fast and affordable outstation taxi services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-bold mb-2">
                {route.from} → {route.to}
              </h3>

              <p className="text-gray-600 mb-3">
                Starting Fare: {route.price}
              </p>

              <p className="text-gray-600 mb-6">
                Travel Time: {route.time}
              </p>

              <a
                href={`tel:+${phone}`}
                className="inline-block bg-black text-white px-5 py-2 rounded-xl"
              >
                Call For Booking
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Cars */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Available Cars</h2>

            <p className="text-gray-600">
              Choose the perfect cab for your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cars.map((car, index) => (
              <div
                key={index}
                className="border rounded-3xl p-6 hover:shadow-xl transition"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-40 w-full object-cover rounded-2xl mb-5"
                />

                <h3 className="text-2xl font-bold mb-2">{car.name}</h3>

                <p className="text-gray-600 mb-1">
                  Type: {car.type}
                </p>

                <p className="text-gray-600 mb-5">
                  Capacity: {car.seats}
                </p>

                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  className="inline-block bg-black text-white px-5 py-2 rounded-xl"
                >
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "24x7 Service",
              "Professional Drivers",
              "Affordable Pricing",
              "Safe Journey",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-3xl text-center shadow"
              >
                <div className="text-2xl font-bold mb-3">✓</div>

                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">
          Patna To Sheohar Taxi Booking
        </h2>

        <p className="text-gray-700 leading-8 mb-4">
          Looking for a reliable Patna to Sheohar cab service? We provide
          one-way and round-trip taxi services at affordable prices.
        </p>

        <p className="text-gray-700 leading-8">
          Book your taxi instantly by calling us or sending a WhatsApp message.
          We offer Swift Dzire, Ertiga and Innova cab services for family trips,
          business travel and emergency travel.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {businessName}
            </h3>

            <p className="text-gray-300">
              Trusted cab booking service for Bihar routes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>

            <p className="text-gray-300 mb-2">
              Phone: +91 {phone}
            </p>

            <p className="text-gray-300">
              Available 24x7
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Service Areas
            </h3>

            <p className="text-gray-300">
              Patna, Sheohar, Muzaffarpur, Sitamarhi, Darbhanga
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}