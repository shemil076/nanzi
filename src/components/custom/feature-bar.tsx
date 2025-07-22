import { CreditCard, FileText, Shield } from 'lucide-react';

const renderSecureIcon = () => {
  return (
    <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
      <Shield color="#2a5ae0" />
    </div>
  );
};

const renderDocumentIcon = () => {
  return (
    <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
      <FileText color="#269a49" />
    </div>
  );
};

const renderCardIcon = () => {
  return (
    <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
      <CreditCard color="#892dde" />
    </div>
  );
};
const FeatureBar = () => {
  return (
    <div className=" py-5 bg-white justify-items-center ">
      <div className="text-2xl font-bold">
        Why <span className="museo-font l">nanzi</span> ?
      </div>

      <div className="flex flex-col sm:flex-row gap-15 text-center my-10">
        {[
          {
            title: 'Secure & Reliable',
            subtitle: 'Your data is protected with enterprise-grade security',
            renderFunction: renderSecureIcon,
          },
          {
            title: 'Document Management',
            subtitle: 'Store and organize all your property documents',
            renderFunction: renderDocumentIcon,
          },
          {
            title: 'Payment Tracking',
            subtitle: 'Monitor rent payments and financial records',
            renderFunction: renderCardIcon,
          },
        ].map((item, index) => (
          <div className="flex flex-col items-center gap-2" key={index}>
            {item.renderFunction()}
            <div className="font-bold">{item.title}</div>
            <div className="text-sm text-gray-600">{item.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureBar;
