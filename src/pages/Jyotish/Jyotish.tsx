/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { CalendarIcon, MoonIcon, StarIcon, SunIcon } from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import type { VedicDate } from "../../types";
import { calculateVedicDate } from "../../utils/vedicTime";
import Loader from "../../components/Shared/Loader/Loader";
import Experts from "../../components/Reusable/Experts/Experts";
import { useGetAllConsultancyServicesQuery } from "../../redux/Features/ConsultancyService/consultancyServiceApi";
import AIReading from "./AIReading";
import { useGetAllDailyHoroscopesQuery } from "../../redux/Features/Jyotish/jyotishApi";

const Jyotish = () => {
  const { theme } = useTheme();
  const [isAiReadingModalOpen, setIsAiReadingModalOpe] = useState(false);
  const { data: dailyHoroscope } = useGetAllDailyHoroscopesQuery({});

  const { data: experts, isLoading: isExpertsLoading } =
    useGetAllConsultancyServicesQuery({});
  const filteredExperts =
    experts?.data?.filter(
      (expert: any) => expert.category === "Jyotish Expert"
    ) || [];

  const [currentVedicDate, setCurrentVedicDate] = useState<VedicDate>(
    calculateVedicDate()
  );

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentVedicDate(calculateVedicDate()),
      60000
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <div
      className={`min-h-screen font-sans ${
        theme === "light"
          ? "bg-light-primary text-light-text-primary"
          : "bg-primary text-dark-text-primary"
      }`}
    >
      <PageHeader title={"Jyotish & Astrology"} />

      <main>
        <section className="p-4">
          <div
            className={`rounded-xl p-5 sm:p-6 shadow-xl ${
              theme === "light"
                ? "bg-light-surface border border-gray-200"
                : "bg-dark-card border border-gray-700/50"
            }`}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shadow-md">
                <CalendarIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2
                  className={`text-xl sm:text-2xl font-bold ${
                    theme === "light"
                      ? "text-light-text-primary"
                      : "text-dark-text-primary"
                  }`}
                >
                  Vedic Calendar
                </h2>
                <p
                  className={`text-xs sm:text-sm ${
                    theme === "light"
                      ? "text-light-text-secondary"
                      : "text-dark-text-secondary"
                  }`}
                >
                  VS {currentVedicDate.vikramYear} • {currentVedicDate.month}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div
                className={`rounded-lg p-4 space-y-2 shadow-inner ${
                  theme === "light"
                    ? "bg-light-surface-alt/50"
                    : "bg-dark-surface/50"
                }`}
              >
                <h3 className="font-semibold text-brand-orange mb-1.5">
                  Current Period
                </h3>
                {(Object.keys(currentVedicDate) as Array<keyof VedicDate>)
                  .filter(
                    (key) =>
                      ![
                        "vikramYear",
                        "month",
                        "paksha",
                        "tithi",
                        "nakshatra",
                        "yoga",
                        "karana",
                        "vara",
                      ].includes(key)
                  )
                  .map((key) => (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span
                        className={`${
                          theme === "light"
                            ? "text-light-text-tertiary"
                            : "text-dark-text-tertiary"
                        } capitalize`}
                      >
                        {key.replace(/([A-Z])/g, " $1")}:
                      </span>
                      <span
                        className={`${
                          theme === "light"
                            ? "text-light-text-primary"
                            : "text-dark-text-primary"
                        } font-medium`}
                      >
                        {currentVedicDate[key]}
                      </span>
                    </div>
                  ))}
              </div>

              <div
                className={`rounded-lg p-4 space-y-2 shadow-inner ${
                  theme === "light"
                    ? "bg-light-surface-alt/50"
                    : "bg-dark-surface/50"
                }`}
              >
                <h3 className="font-semibold text-brand-orange mb-1.5">
                  Today's Panchang
                </h3>
                {(
                  [
                    "tithi",
                    "paksha",
                    "nakshatra",
                    "yoga",
                    "karana",
                    "vara",
                  ] as Array<keyof VedicDate>
                )
                  .map((key) => (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span
                        className={`${
                          theme === "light"
                            ? "text-light-text-tertiary"
                            : "text-dark-text-tertiary"
                        } capitalize`}
                      >
                        {key}:
                      </span>
                      <span
                        className={`${
                          theme === "light"
                            ? "text-light-text-primary"
                            : "text-dark-text-primary"
                        } font-medium`}
                      >
                        {key === "tithi"
                          ? `${currentVedicDate.paksha} ${currentVedicDate.tithi}`
                          : (currentVedicDate as any)[key]}
                      </span>
                    </div>
                  ))
                  .filter((_, i) => {
                    const explicitPanchangKeys: (keyof VedicDate)[] = [
                      "tithi",
                      "nakshatra",
                      "yoga",
                      "karana",
                      "vara",
                    ];
                    return explicitPanchangKeys.includes(
                      ["tithi", "nakshatra", "yoga", "karana", "vara"][
                        i
                      ] as keyof VedicDate
                    );
                  })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
              <div
                className={`rounded-lg p-4 shadow-inner ${
                  theme === "light"
                    ? "bg-light-surface-alt/50"
                    : "bg-dark-surface/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <SunIcon className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold text-brand-orange">
                    Sun Transit
                  </h3>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`${
                      theme === "light"
                        ? "text-light-text-tertiary"
                        : "text-dark-text-tertiary"
                    }`}
                  >
                    Sunrise:
                  </span>{" "}
                  <span
                    className={`${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-dark-text-primary"
                    } font-medium`}
                  >
                    6:15 AM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`${
                      theme === "light"
                        ? "text-light-text-tertiary"
                        : "text-dark-text-tertiary"
                    }`}
                  >
                    Sunset:
                  </span>{" "}
                  <span
                    className={`${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-dark-text-primary"
                    } font-medium`}
                  >
                    5:45 PM
                  </span>
                </div>
              </div>
              <div
                className={`rounded-lg p-4 shadow-inner ${
                  theme === "light"
                    ? "bg-light-surface-alt/50"
                    : "bg-dark-surface/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <MoonIcon className="w-5 h-5 text-blue-300" />
                  <h3 className="font-semibold text-brand-orange">
                    Moon Transit
                  </h3>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`${
                      theme === "light"
                        ? "text-light-text-tertiary"
                        : "text-dark-text-tertiary"
                    }`}
                  >
                    Moonrise:
                  </span>{" "}
                  <span
                    className={`${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-dark-text-primary"
                    } font-medium`}
                  >
                    8:30 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`${
                      theme === "light"
                        ? "text-light-text-tertiary"
                        : "text-dark-text-tertiary"
                    }`}
                  >
                    Moonset:
                  </span>{" "}
                  <span
                    className={`${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-dark-text-primary"
                    } font-medium`}
                  >
                    9:15 AM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="p-4 pt-0">
          <h2
            className={`text-xl font-semibold mb-4 ${
              theme === "light"
                ? "text-light-text-primary"
                : "text-dark-text-primary"
            }`}
          >
            Daily Horoscope
          </h2>
          <div className="space-y-4">
            {dailyHoroscope?.data?.map((horoscope: any, index: number) => (
              <div
                key={index}
                className={`rounded-lg p-4 shadow-lg ${
                  theme === "light" ? "bg-light-surface" : "bg-dark-card"
                }`}
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <StarIcon className="w-6 h-6 text-yellow-400" />
                  <h3
                    className={`text-lg font-semibold ${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-dark-text-primary"
                    }`}
                  >
                    {horoscope.name}
                  </h3>
                </div>
                <p
                  className={`text-sm mb-3 ${
                    theme === "light"
                      ? "text-light-text-secondary"
                      : "text-dark-text-secondary"
                  }`}
                >
                  {horoscope.description}
                </p>
                <div
                  className={`grid grid-cols-3 gap-2 text-xs pt-3 ${
                    theme === "light"
                      ? "border-t border-gray-200"
                      : "border-t border-gray-700/50"
                  }`}
                >
                  <div className="text-center">
                    <p
                      className={`${
                        theme === "light"
                          ? "text-light-text-tertiary"
                          : "text-dark-text-tertiary"
                      }`}
                    >
                      Color
                    </p>
                    <p
                      className={`font-medium ${
                        theme === "light"
                          ? "text-light-text-primary"
                          : "text-dark-text-primary"
                      }`}
                    >
                      {horoscope.color}
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      className={`${
                        theme === "light"
                          ? "text-light-text-tertiary"
                          : "text-dark-text-tertiary"
                      }`}
                    >
                      Number
                    </p>
                    <p
                      className={`font-medium ${
                        theme === "light"
                          ? "text-light-text-primary"
                          : "text-dark-text-primary"
                      }`}
                    >
                      {horoscope.number}
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      className={`${
                        theme === "light"
                          ? "text-light-text-tertiary"
                          : "text-dark-text-tertiary"
                      }`}
                    >
                      Direction
                    </p>
                    <p
                      className={`font-medium ${
                        theme === "light"
                          ? "text-light-text-primary"
                          : "text-dark-text-primary"
                      }`}
                    >
                      {horoscope.direction}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsAiReadingModalOpe(true)}
            className={`mt-6 w-full text-brand-orange hover:bg-opacity-80 transition-colors rounded-lg py-2.5 text-sm font-medium ${
              theme === "light"
                ? "bg-brand-orange/10 hover:bg-brand-orange/20"
                : "bg-brand-orange/20 hover:bg-brand-orange/30"
            }`}
          >
            AI Reading
          </button>
        </section>
      </main>
      <div className="mb-14">
        {isExpertsLoading ? (
          <Loader />
        ) : (
          <Experts
            data={filteredExperts}
            title={"Jyotish"}
            isLoading={isExpertsLoading}
          />
        )}
      </div>

      {isAiReadingModalOpen && (
        <AIReading setIsAiReadingModalOpen={setIsAiReadingModalOpe} />
      )}
    </div>
  );
};

export default Jyotish;
