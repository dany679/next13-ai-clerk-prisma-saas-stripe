import { Heading } from "@/components/Heading";
import { routesObjects } from "@/utils/constants";

import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { use } from "react";
const SettingsPage = () => {
  const page = routesObjects.settings;

  const isPro = use(checkSubscription());

  return (
    <div>
      <Heading.root>
        <Heading.icon
          Icon={page.icon}
          iconColor={"text-gray-700"}
          bgColor={page.bgColor}
        />
        <Heading.title
          title={page.label}
          description="manage account settings."
        />
      </Heading.root>
      <div className="px-4 lg:px-8">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "You are currently on a Pro plan."
            : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
