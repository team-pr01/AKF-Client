import { Clock, Star } from 'lucide-react';
import Loader from '../../Shared/Loader/Loader';

interface Expert {
  _id: string;
  imageUrl: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  fees: number;
  availableTime: string;
  availabilityType: string[];
}

interface ExpertsProps {
  data: Expert[];
  title: string;
  isLoading: boolean;
}

const Experts: React.FC<ExpertsProps> = ({ data, title, isLoading }) => {
  return (
    <div className="w-full">
      <div className="px-4 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title} Experts</h2>
        {
        isLoading ?
        <Loader/>
        :
        data?.length > 0 ? (
          <div className="space-y-3">
            {data.map((expert) => (
              <div
                key={expert._id}
                className="block"
              >
                <div className="bg-white rounded-xl p-4 flex gap-3 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="relative size-20">
                    <img
                      src={expert.imageUrl}
                      alt={expert.name}
                      className="rounded-full size-20 object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-800 mb-1">{expert.name}</h3>
                    <p className="text-sm text-orange-600 mb-1">{expert.specialty}</p>
                    <p className="text-xs text-gray-500 mb-2">{expert.experience} experience</p>

                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-amber-500 fill-amber-500" />
                        <span className="text-sm font-semibold text-gray-800">{expert.rating}</span>
                      </div>
                      <span className="text-base font-bold text-emerald-500">৳{expert.fees}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-2">
                      <Clock size={14} className="text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-500">{expert.availableTime}</span>
                    </div>

                    <div className="flex gap-1.5">
                      {expert.availabilityType.slice(0, 3).map((type) => (
                        <span 
                          key={type} 
                          className="bg-blue-50 rounded-full px-2 py-1 text-xs font-medium text-blue-800 capitalize"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm py-5">
            No {title} experts found for your search.
          </p>
        )}
      </div>

      <div className="h-5"></div>
    </div>
  );
};

export default Experts;