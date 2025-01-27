import React from 'react';
import '@npm-questionpro/wick-ui-lib/dist/fonts/icon.css';
import '@npm-questionpro/wick-ui-lib/dist/style.css';
import { WuAppHeader,WuAppHeaderSearch  } from '@npm-questionpro/wick-ui-lib';

export default function AppHeader() {
  return (
    <WuAppHeader

      categories={[
        {
          active: true,
          desc: '',
          logo: 'https://www.questionpro.com/images/appnavigation/research-suite.svg',
          name: 'Organization',
          order: 1,
          products: [
            {
              active: true,
              icon: 'e308',
              link: 'https://docs.google.com/spreadsheets/d/17fCLaNeRApFNjEspdmmHhshaztnCJBwJKl8G8ccps4g/edit?gid=0#gid=0',
              logo: 'https://www.questionpro.com/images/appnavigation/survey-product.png',
              name: 'Directory',
              order: 1
            },
            {
              active: true,
              icon: 'e314',
              link: 'https://sites.google.com/a/questionpro.com/qpwiki?pli=1',
              logo: 'https://www.questionpro.com/images/appnavigation/communities-product.png',
              name: 'Help',
              order: 2
            }
          ]
        }
      ]}
      onLogout={function Ki() {}}
      productName="OrgChart"
      user={{
        invoice: {
          size: 2,
          title: 'Billing & Invoices',
          url: 'https://www.questionpro.com/a/showUpgradeUser.do?payment=PaymentHistory'
        },
        profile: {
          companyName: 'Untitled - Company Name',
          initials: 'MI',
          subtitle: 'saiful.islam@questionpro.com',
          title: 'Md. Saiful Islam'
        },
        settings: [
          {
            title: 'My Account',
            url: 'https://www.questionpro.com/a/showUpgradeUser.do?payment=creditCardUpdate'
          }
        ]
      }}
    >
      <div className="flex items-end justify-end w-full">
        <WuAppHeaderSearch onSearch={function Ki() {}} />
      </div>
    </WuAppHeader>
  );
}
