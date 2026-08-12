import {
  PaymentGateway,
  PaymentStatus,
  Plan,
  SubscriptionPlan,
  SubscriptionStatus,
} from "@/config/constant";
import { UserRole, UserStatus } from "@/utils/authUtils";

export interface IAdminDashboardStats {
  totalUsers: number;
  activeSubscriptions: number;
  totalRevenue: number;
  totalGenerations: number;
  generationStats: { type: string; count: number }[];
  chartData: { month: string; revenue: number }[];
  recentPayments: {
    id: string;
    userId: string;
    gateway: string;
    status: string;
    amount: number;
    currency: string;
    transactionId: string;
    planActivated: Plan;
    metadata: {
      id: string;
      url: null;
      mode: string;
      locale: null;
      object: string;
      status: string;
      consent: null;
      created: number;
      invoice: string;
      ui_mode: string;
      currency: string;
      customer: string;
      livemode: false;
      metadata: {
        plan: SubscriptionPlan;
        userId: string;
      };
      discounts: [];
      cancel_url: string;
      expires_at: 1786536471;
      custom_text: {
        submit: null;
        after_submit: null;
        shipping_address: null;
        terms_of_service_acceptance: null;
      };
      permissions: null;
      submit_type: null;
      success_url: string;
      amount_total: 9999;
      payment_link: null;
      setup_intent: null;
      subscription: string;
      automatic_tax: {
        status: null;
        enabled: false;
        provider: null;
        liability: null;
      };
      client_secret: null;
      custom_fields: [];
      shipping_cost: null;
      total_details: {
        amount_tax: 0;
        amount_discount: 0;
        amount_shipping: 0;
      };
      customer_email: null;
      origin_context: null;
      payment_intent: null;
      payment_status: string;
      recovered_from: null;
      wallet_options: null;
      amount_subtotal: 9999;
      adaptive_pricing: {
        enabled: true;
      };
      after_expiration: null;
      customer_account: null;
      customer_details: {
        name: string;
        email: string;
        phone: null;
        address: {
          city: null;
          line1: null;
          line2: null;
          state: null;
          country: string;
          postal_code: null;
        };
        tax_ids: [];
        tax_exempt: string;
        business_name: null;
        individual_name: null;
      };
      invoice_creation: null;
      managed_payments: {
        enabled: false;
      };
      shipping_options: [];
      branding_settings: {
        icon: null;
        logo: null;
        font_family: string;
        border_style: string;
        button_color: string;
        display_name: string;
        background_color: string;
      };
      customer_creation: null;
      consent_collection: null;
      client_reference_id: null;
      currency_conversion: null;
      presentment_details: {
        presentment_amount: number;
        presentment_currency: string;
      };
      payment_method_types: ["card"];
      allow_promotion_codes: null;
      collected_information: {
        business_name: null;
        individual_name: null;
        shipping_details: null;
      };
      integration_identifier: null;
      payment_method_options: {
        card: {
          request_three_d_secure: string;
        };
      };
      phone_number_collection: {
        enabled: false;
      };
      payment_method_collection: string;
      billing_address_collection: null;
      shipping_address_collection: null;
      saved_payment_method_options: {
        payment_method_save: null;
        payment_method_remove: string;
        allow_redisplay_filters: ["always"];
      };
      payment_method_configuration_details: null;
    };
    createdAt: string;
    subscriptionId: string;
    user: {
      name: string;
      email: string;
    };
  }[];
  recentUsers: {
    id: string;
    name: string;
    email: string;
    plan: Plan;
    role: UserRole;
    createdAt: string;
  }[];
}

export interface IUsers {
  id: string;
  name: string;
  email: string;
  image: null;
  role: UserRole;
  plan: Plan;
  planExpiresAt: string;
  lastResetDate: string;
  stripeCustomerId: string;
  stripeSubId: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  phone: string;
  status: UserStatus;
  isDeleted: boolean;
  deletedAt: string;
  textToImage: number;
  aiChatbot: number;
  codeChecker: number;
  imageBackgroundRemover: number;
  imageCaptionGenerator: number;
  resumeAnalyzer: number;
  languageTranslator: number;
  grammarChecker: number;
  textToSpeech: number;
  speechToText: number;
  imageToVideo: number;
  textToVideo: number;
  textToImageLastRefreshAT: string;
  aiChatbotLastRefreshAT: string;
  codeCheckerLastRefreshAT: string;
  imageBackgroundRemoverLastRefreshAT: string;
  imageCaptionGeneratorLastRefreshAT: string;
  resumeAnalyzerLastRefreshAT: string;
  languageTranslatorLastRefreshAT: string;
  grammarCheckerLastRefreshAT: string;
  textToSpeechLastRefreshAT: string;
  speechToTextLastRefreshAT: string;
  imageToVideoLastRefreshAT: string;
  textToVideoLastRefreshAT: string;
}

export interface IAdminUsersResult {
  user: IUsers;
  subscription: {
    id: string;
    userId: string;
    plan: Plan;
    status: SubscriptionStatus;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripePriceId: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    cancelledAt: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

export interface IAdminPaymentsResult {
  id: string;
  userId: string;
  gateway: PaymentGateway;
  status: PaymentStatus;
  amount: number;
  currency: string;
  transactionId: string;
  planActivated: Plan;
  metadata: {
    id: string;
    url: null;
    mode: string;
    locale: null;
    object: string;
    status: string;
    consent: null;
    created: number;
    invoice: string;
    ui_mode: string;
    currency: string;
    customer: string;
    livemode: boolean;
    metadata: {
      plan: Plan;
      userId: string;
    };
    discounts: [];
    cancel_url: string;
    expires_at: number;
    custom_text: {
      submit: null;
      after_submit: null;
      shipping_address: null;
      terms_of_service_acceptance: null;
    };
    permissions: null;
    submit_type: null;
    success_url: string;
    amount_total: number;
    payment_link: null;
    setup_intent: null;
    subscription: string;
    automatic_tax: {
      status: null;
      enabled: false;
      provider: null;
      liability: null;
    };
    client_secret: null;
    custom_fields: [];
    shipping_cost: null;
    total_details: {
      amount_tax: number;
      amount_discount: number;
      amount_shipping: number;
    };
    customer_email: null;
    origin_context: null;
    payment_intent: null;
    payment_status: string;
    recovered_from: null;
    wallet_options: null;
    amount_subtotal: number;
    adaptive_pricing: {
      enabled: boolean;
    };
    after_expiration: null;
    customer_account: null;
    customer_details: {
      name: string;
      email: string;
      phone: null;
      address: {
        city: null;
        line1: null;
        line2: null;
        state: null;
        country: string;
        postal_code: null;
      };
      tax_ids: [];
      tax_exempt: string;
      business_name: null;
      individual_name: null;
    };
    invoice_creation: null;
    managed_payments: {
      enabled: false;
    };
    shipping_options: [];
    branding_settings: {
      icon: null;
      logo: null;
      font_family: string;
      border_style: string;
      button_color: string;
      display_name: string;
      background_color: string;
    };
    customer_creation: null;
    consent_collection: null;
    client_reference_id: null;
    currency_conversion: null;
    presentment_details: {
      presentment_amount: number;
      presentment_currency: string;
    };
    payment_method_types: string[];
    allow_promotion_codes: null;
    collected_information: {
      business_name: null;
      individual_name: null;
      shipping_details: null;
    };
    integration_identifier: null;
    payment_method_options: {
      card: {
        request_three_d_secure: string;
      };
    };
    phone_number_collection: {
      enabled: boolean;
    };
    payment_method_collection: string;
    billing_address_collection: null;
    shipping_address_collection: null;
    saved_payment_method_options: {
      payment_method_save: null;
      payment_method_remove: string;
      allow_redisplay_filters: string[];
    };
    payment_method_configuration_details: null;
  };
  createdAt: string;
  subscriptionId: string;
  user: {
    name: string;
    email: string;
  };
}
