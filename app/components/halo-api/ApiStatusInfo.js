"use client";

const ApiStatusInfo = ({ apiStatus, setApiStatus }) => {
  return (
    <>
      <div className="mx-auto mt-8  min-w-[600px] max-w-[600px] break-words rounded-md bg-white p-9 text-left text-base text-black drop-shadow-md ">
        <div className="mx-auto flex   justify-start  ">
          <div className="w-1/4 pr-4">
            {[
              "Token",
              "Email",
              "Remaining",
              "Rate Limit",
              "Status",
              "API doc",
            ].map((title) => (
              <div className="mb-5" key={title}>
                {title} :
              </div>
            ))}
            <div className="mt-9">Access :</div>
          </div>
          <div className="w-3/4 pl-4 font-bold">
            {[
              `${apiStatus?.token}`,
              `${apiStatus?.email}`,
              `${apiStatus?.apiCount?.remain}`,
              `${apiStatus?.apiCount?.rateLimit}`,
              `${apiStatus?.status}`,
              <div
                key="#api-doc"
                className="rounded-md bg-[#F5F8FA] p-3 font-medium underline-offset-8 hover:underline "
              >
                <a href={apiStatus?.apiDocsUrl} target="blank">
                  {apiStatus?.apiDocsUrl}
                </a>
              </div>,
              <div
                key="#access"
                className="w-fit flex-col space-y-5 break-words rounded-md bg-[#F5F8FA] p-3 font-mono font-bold"
              >
                {apiStatus?.acls &&
                  Object.keys(apiStatus?.acls).map((key) => (
                    <div key={key} className="flex break-words">
                      <p className="w-fit rounded-sm bg-[#c9c9c9] px-2 uppercase">
                        {apiStatus?.acls[key]}
                      </p>
                      {key}
                    </div>
                  ))}
              </div>,
            ].map((content, index) => (
              <>
                <div key={index} className="mb-5  break-words font-bold">
                  {content}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => setApiStatus(null)}
        className="-translate-y-9 rounded-md bg-green p-5 text-base font-extralight text-white hover:drop-shadow-[0_0_5px_rgba(0,174,189,0.5)]"
      >
        View another API status
      </button>
    </>
  );
};

export default ApiStatusInfo;
