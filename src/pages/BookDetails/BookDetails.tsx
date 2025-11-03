/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flag,
  Languages,
  Search,
  X,
} from "lucide-react";
import { LANGUAGES as allLanguages } from "../../utils/allLanguages";
import {
  useGetSingleBookQuery,
  useGetSingleVedaQuery,
} from "../../redux/Features/Book/bookApi";
import { useTheme } from "../../contexts/ThemeContext";
import ReportModal from "../../components/ReportModal/ReportModal";

const BookDetails = () => {
  const { id: vedaId } = useParams();
  const { data: veda, isLoading: isVedaLoading } =
    useGetSingleBookQuery(vedaId);

  // extract levels once book is loaded
  const leve1 = veda?.data?.[0]?.location?.[0]?.levelName;
  const leve2 = veda?.data?.[0]?.location?.[1]?.levelName;
  const leve3 = veda?.data?.[0]?.location?.[2]?.levelName;

  const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  const [showSubsectionDropdown, setShowSubsectionDropdown] = useState(false);
  const [showVerseDropdown, setShowVerseDropdown] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");
  const [targetLanguage, setTargetLanguage] = useState({
    name: "select language",
    code: "en",
  });
  const [currentTranslation, setCurrentTranslation] = useState();
  // selected values
  const [currentSection, setCurrentSection] = useState<string | null>(
    veda?.data?.[0]?.location?.[0]?.value
  );
  const [currentSubSection, setCurrentSubSection] = useState<string | null>(
    veda?.data?.[0]?.location?.[1]?.value
  );
  const [currentVerse, setCurrentVerse] = useState<string | null>(
    veda?.data?.[0]?.location?.[2]?.value
  );

  const [level1Values, setLevel1Values] = useState<string[]>([]);
  const [level2Values, setLevel2Values] = useState<string[]>([]);
  const [level3Values, setLevel3Values] = useState<string[]>([]);
  const [flattenedVerses, setFlattenedVerses] = useState<
    { locationKey: string; levels: string[] }[]
  >([]);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportingVerse, setReportingVerse] = useState(null);
  useEffect(() => {
    if (veda?.data?.length) {
      // 1️⃣ Flatten and normalize all locations
      const all = veda?.data?.map((item: any) => {
        const levels = item?.location
          ?.map((l: any) => l?.value)
          .filter(Boolean);
        return {
          locationKey: levels?.join("."), // e.g., "1.2" or "1.2.3"
          levels,
        };
      });

      // 2️⃣ Sort numerically level-by-level
      all.sort((a, b) => {
        const aParts = a.levels.map(Number);
        const bParts = b.levels.map(Number);
        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const diff = (aParts[i] ?? 0) - (bParts[i] ?? 0);
          if (diff !== 0) return diff;
        }
        return 0;
      });

      setFlattenedVerses(all);
    }
  }, [veda]);
  const [currentVerseIndex, setCurrentVerseIndex] = useState<number>(-1);

  useEffect(() => {
    if (!flattenedVerses.length) return;

    const currentKey = [currentSection, currentSubSection, currentVerse]
      .filter(Boolean)
      .join(".");

    const idx = flattenedVerses.findIndex((v) => v.locationKey === currentKey);
    setCurrentVerseIndex(idx);
  }, [flattenedVerses, currentSection, currentSubSection, currentVerse]);

  const navigateVerse = (direction: "next" | "previous") => {
    if (!flattenedVerses.length) return;

    const newIndex =
      direction === "next" ? currentVerseIndex + 1 : currentVerseIndex - 1;

    if (newIndex < 0 || newIndex >= flattenedVerses.length) return;
    const next = flattenedVerses[newIndex];

    // Reset state levels dynamically based on available depth
    setCurrentSection(next.levels[0]);
    setCurrentSubSection(next.levels[1] || null);
    setCurrentVerse(next.levels[2] || null);
    setTargetLanguage({ name: "select language", code: "en" });
    setCurrentTranslation(null);
  };

  useEffect(() => {
    console.log(veda?.data, "ss");
    if (veda?.data) {
      const l1Values = [
        ...new Set(
          veda?.data
            ?.map((item: any) => item.location?.[0]?.value)
            .filter(Boolean)
        ),
      ] as string[];

      setLevel1Values(l1Values);

      // Auto-select the first section (optional)
      if (l1Values.length > 0 && !currentSection) {
        setCurrentSection(l1Values[0]);
      }

      // Reset deeper levels
      // setCurrentSubSection(null);
      // setCurrentVerse(null);
      setLevel2Values([]);
      setLevel3Values([]);
    }
  }, [veda]);

  useEffect(() => {
    if (currentSection && veda?.data) {
      const l2Values = [
        ...new Set(
          veda.data
            .filter((item: any) => item.location?.[0]?.value === currentSection)
            .map((item: any) => item.location?.[1]?.value)
            .filter(Boolean)
        ),
      ] as string[];

      setLevel2Values(l2Values);

      // Auto-select first subsection (optional)
      if (l2Values.length > 0 && !currentSubSection) {
        setCurrentSubSection(l2Values[0]);
      }

      // Reset level 3
      setLevel3Values([]);
      // setCurrentVerse(null);
    }
  }, [currentSection, veda]);

  useEffect(() => {
    if (currentSubSection && veda?.data) {
      const l3Values = [
        ...new Set(
          veda.data
            .filter(
              (item: any) =>
                item.location?.[0]?.value === currentSection &&
                item.location?.[1]?.value === currentSubSection
            )
            .map((item: any) => item.location?.[2]?.value)
            .filter(Boolean)
        ),
      ] as string[];

      setLevel3Values(l3Values);

      // Auto-select first verse (optional)
      if (l3Values.length > 0 && !currentVerse) {
        setCurrentVerse(l3Values[0]);
      }
    }
  }, [currentSubSection, currentSection, veda]);
  useEffect(() => {
    if (!veda) return;

    const hasThreeLevels = Boolean(leve3);
    const shouldCall =
      (hasThreeLevels && currentSection && currentSubSection && currentVerse) ||
      (!hasThreeLevels && currentSection && currentSubSection);

    if (shouldCall) {
      const p: any = {
        id: vedaId,
        field1: leve1,
        field1Value: currentSection,
        field2: leve2,
        field2Value: currentSubSection,
      };

      if (hasThreeLevels) {
        p.field3 = leve3;
        p.field3Value = currentVerse;
      }

      setPayload(p);
    }
  }, [
    veda,
    leve1,
    leve2,
    leve3,
    currentSection,
    currentSubSection,
    currentVerse,
    vedaId,
  ]);
  const [payload, setPayload] = useState<any | null>(null);
  const { data: CurrentVeda, isLoading } = useGetSingleVedaQuery(payload!, {
    skip: !payload,
  });
  const [verseData, setVerseData] = useState<any>(null);
  useEffect(() => {
    const current = CurrentVeda?.data?.[0];
    if (!current) return;

    setVerseData(current);
    console.log(current);

    const availableTranslationLanguageCodes =
      current?.translations?.map((t) => t.langCode?.toLowerCase()) || [];

    // Only call if translation exists for target language
    if (
      availableTranslationLanguageCodes.includes(
        targetLanguage.code.toLowerCase()
      )
    )
      getTranslationByLang(targetLanguage.code);
  }, [CurrentVeda, targetLanguage, veda]);
  const getTranslationByLang = (langCode) => {
    const showTranslation =
      verseData?.translations?.find((t) => t.langCode === langCode)
        ?.translation || "Translation not available";
    setCurrentTranslation(showTranslation);
    console.log(currentTranslation, "translation");
  };
  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
    setReportingVerse(null);
  };
  const handleOpenReportModal = (verse) => {
    setReportingVerse(verse);
    setIsReportModalOpen(true);
  };
  const availableLanguageCodes = useMemo<string[]>(() => {
    if (!allLanguages || !CurrentVeda?.data?.[0]) return [];

    const availableTranslationLanguageCodes =
      CurrentVeda.data[0]?.translations?.map((t) => t.langCode.toLowerCase());

    // Return an array of language codes (strings) that are available in translations
    return allLanguages
      .map((lang) => lang.code.toLowerCase())
      .filter((code) => availableTranslationLanguageCodes.includes(code));
  }, [allLanguages, CurrentVeda]);

  const filteredLanguages = useMemo(() => {
    return allLanguages.filter(
      (lang) =>
        availableLanguageCodes.includes(lang.code.toLowerCase()) &&
        lang.name.toLowerCase().includes(languageSearchTerm.toLowerCase())
    );
  }, [allLanguages, availableLanguageCodes, languageSearchTerm]);

  return (
    <div>
      <PageHeader title={"Ayurdeva"} />

      <div className="mb-4 px-4 relative">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          {veda?.data[0]?.location[0]?.levelName}
        </p>

        <button
          onClick={() => {
            setShowSectionDropdown(!showSectionDropdown);
            setShowSubsectionDropdown(false);
            setShowVerseDropdown(false);
          }}
          className="w-full flex justify-between items-center border border-gray-300 bg-gray-50 rounded-lg px-3 py-2"
        >
          <span className="text-sm text-gray-800">
            {currentSection ||
              `Select ${veda?.data[0]?.location?.[1]?.levelName || "Section"}`}
          </span>
          <ChevronDown size={18} className="text-gray-500" />
        </button>

        {showSectionDropdown && (
          <div className="absolute z-10 mt-2 left-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {level1Values.map((section, i) => (
              <div
                key={i}
                onClick={() => {
                  setCurrentSection(section);
                  setShowSectionDropdown(false);
                }}
                className={`px-3 py-2 text-sm cursor-pointer ${
                  currentSection === section
                    ? "bg-orange-100 text-orange-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {section}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subsection Dropdown */}
      {currentSection && (
        <div className="mb-4 px-4 relative">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {veda?.data?.[0]?.location?.[1]?.levelName || "Subsection"}
          </p>

          <button
            onClick={() => {
              setShowSubsectionDropdown(!showSubsectionDropdown);
              setShowSectionDropdown(false);
              setShowVerseDropdown(false);
            }}
            className="w-full flex justify-between items-center border border-gray-300 bg-gray-50 rounded-lg px-3 py-2"
          >
            <span className="text-sm text-gray-800">
              {currentSubSection ||
                `Select ${
                  veda?.data?.[0]?.location?.[1]?.levelName || "Subsection"
                }`}
            </span>
            <ChevronDown size={18} className="text-gray-500" />
          </button>

          {showSubsectionDropdown && (
            <div className="absolute z-10 mt-2 left-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {level2Values.map((subsection) => (
                <div
                  key={subsection}
                  onClick={() => {
                    setCurrentSubSection(subsection);
                    setShowSubsectionDropdown(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer ${
                    currentSubSection === subsection
                      ? "bg-orange-100 text-orange-600"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {subsection}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Verse Dropdown */}
      {currentSubSection && (
        <div className="mb-4 px-4 relative">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {veda?.data?.[0]?.location?.[2]?.levelName || "Verse"}
          </p>

          <button
            onClick={() => {
              setShowVerseDropdown(!showVerseDropdown);
              setShowSectionDropdown(false);
              setShowSubsectionDropdown(false);
            }}
            className="w-full flex justify-between items-center border border-gray-300 bg-gray-50 rounded-lg px-3 py-2"
          >
            <span className="text-sm text-gray-800">
              {currentVerse ||
                `Select ${
                  veda?.data?.[0]?.location?.[2]?.levelName || "Verse"
                }`}
            </span>
            <ChevronDown size={18} className="text-gray-500" />
          </button>

          {showVerseDropdown && (
            <div className="absolute z-10 mt-2 left-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {level3Values.map((verse) => (
                <div
                  key={verse}
                  onClick={() => {
                    setCurrentVerse(verse);
                    setShowVerseDropdown(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer ${
                    currentVerse === verse
                      ? "bg-orange-100 text-orange-600"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {verse}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isVedaLoading || isLoading ? (
        <div>loading...</div>
      ) : verseData ? (
        <div className="bg-white mb-14 dark:bg-[#2D3748] rounded-xl shadow-lg p-6  shadow-[#00000010] dark:shadow-[#00000020]">
          {/* Sanskrit Text */}
          <div className="mb-6">
            {verseData?.originalText &&
              verseData.originalText
                .split("।")
                .filter((line) => line.trim() !== "")
                .map((line, index) => (
                  <p
                    key={`orig-${index}`}
                    className="text-xl text-[#2D3748] dark:text-[#F7FAFC] text-center leading-relaxed mb-4 font-serif"
                  >
                    {line.trim()}।
                  </p>
                ))}
          </div>

          {/* Translation Controls */}
          <div className="flex justify-between items-center mb-6">
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              onClick={() => setShowLanguageModal(true)}
            >
              <Languages size={16} color="#FFFFFF" />
              <span className="text-white text-sm font-medium">
                to: {targetLanguage.name}
              </span>
              <ChevronRight size={16} color="#FFFFFF" />
            </button>

            <button
              className="p-2 bg-red-500/10 hover:bg-red-50 rounded-full transition-colors"
              onClick={() => handleOpenReportModal(verseData)}
            >
              <Flag size={16} color="#EF4444" />
            </button>
          </div>

          {/* Translation */}
          {currentTranslation && (
            <div className="border-t pt-6 mb-6 border-t-[#E2E8F0] dark:border-t-[#4A5568]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-[#718096] dark:text-[#A0AEC0]">
                  Translation by AI
                </span>
                {verseData?.isHumanVerified && (
                  <div className="bg-[#10B981]/20 dark:bg-[#38B2AC]/20 text-[#10B981] dark:text-[#38B2AC] text-xs font-semibold px-2 py-1 rounded">
                    Human Verified
                  </div>
                )}
              </div>

              {/* Translation Content */}
              <div className="space-y-4">
                {currentTranslation !== currentTranslation && (
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-[#FF6F00] dark:text-[#FF8F00]">
                      भावार्थ (Purport/Essence)
                    </h4>
                    <p className="text-[#2D3748] dark:text-[#F7FAFC]"></p>
                  </div>
                )}
                <div>
                  <p className="leading-relaxed text-[#2D3748] dark:text-[#F7FAFC]">
                    {currentTranslation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center border-t pt-6 border-t-[#E2E8F0] dark:border-t-[#4A5568]">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F7FAFC] dark:bg-[#1A202C] transition-colors ${
                currentVerseIndex <= 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => navigateVerse("previous")}
              disabled={currentVerseIndex <= 0}
            >
              <ChevronLeft
                size={16}
                className={`{${
                  currentVerseIndex <= 0
                }? "text-[#E2E8F0] dark:text-[#4A5568] ": "text-[#718096] dark:text-[#A0AEC0]"}`}
              />
              <span
                className={`text-sm font-medium ${
                  currentVerseIndex <= 0
                    ? "text-[#E2E8F0] dark:text-[#4A5568] "
                    : "text-[#718096] dark:text-[#A0AEC0]"
                }`}
              >
                Previous
              </span>
            </button>

            <span className="text-sm font-semibold text-[#2D3748] dark:text-[#F7FAFC]">
              {currentSection}.{currentSubSection}
              {currentVerse && `.${currentVerse}`}
            </span>

            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentVerseIndex >= flattenedVerses.length - 1
                  ? "opacity-50 cursor-not-allowed bg-[#E2E8F0] dark:bg-[#4A5568]"
                  : "hover:bg-orange-700 bg-[#FF6F00] dark:bg-[#FF8F00]"
              }`}
              onClick={() => navigateVerse("next")}
              disabled={currentVerseIndex >= flattenedVerses.length - 1}
            >
              <span
                className={`text-sm font-medium ${
                  currentVerseIndex >= flattenedVerses.length - 1
                    ? "text-gray-400"
                    : "text-white"
                }`}
              >
                Next
              </span>
              <ChevronRight
                size={16}
                className={`{${
                  currentVerseIndex <= 0
                }? "text-[#E2E8F0] dark:text-[#4A5568] ": "text-[#718096] dark:text-[#A0AEC0]"}`}
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <BookOpen size={48} color="#CBD5E0" />
          <p className="text-center mt-4 text-lg text-[#718096] dark:text-[#A0AEC0]">
            {veda?.sections?.length > 0
              ? "Select a section, subsection, and verse to display."
              : "No content available for this Vedic text yet."}
          </p>
        </div>
      )}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl dark:bg-neutral-900 dark:text-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-neutral-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Translation Language
              </h2>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                <X size={24} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Search Field */}
            <div className="mx-4 mt-3 flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800">
              <Search size={16} className="text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search languages..."
                value={languageSearchTerm}
                onChange={(e) => setLanguageSearchTerm(e.target.value)}
                className="ml-2 w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white"
              />
            </div>

            {/* Language List */}
            <div className="max-h-80 overflow-y-auto px-4 py-3">
              {filteredLanguages?.length > 0 ? (
                filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setTargetLanguage(lang);
                      setShowLanguageModal(false);
                      setLanguageSearchTerm("");
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                      targetLanguage?.code === lang?.code
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span
                      className={`text-xs ${
                        targetLanguage?.code === lang?.code
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      ({lang.code})
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-2 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                  No languages found matching “{languageSearchTerm}”
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {isReportModalOpen && reportingVerse && currentTranslation && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={handleCloseReportModal}
          verseId={reportingVerse._id}
          bookId={vedaId}
          originalText={verseData.originalText}
          translation={currentTranslation}
          languageCode={targetLanguage.code}
        />
      )}
    </div>
  );
};

export default BookDetails;
