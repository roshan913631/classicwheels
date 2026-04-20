import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import AuthGuard from "./components/AuthGuard";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Lazy-loaded pages
const StorefrontPage = lazy(() => import("./pages/Storefront"));
const CarDetailPage = lazy(() => import("./pages/CarDetail"));
const AdminPage = lazy(() => import("./pages/Admin"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const OrderConfirmationPage = lazy(() => import("./pages/OrderConfirmation"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[40vh]">
    <LoadingSpinner size="lg" />
  </div>
);

// Root route — Layout wraps all child routes via Outlet
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <StorefrontPage />
    </Suspense>
  ),
});

const carDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cars/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CarDetailPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <AdminPage />
      </Suspense>
    </AuthGuard>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CheckoutPage />
    </Suspense>
  ),
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation/$orderId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OrderConfirmationPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  carDetailRoute,
  adminRoute,
  checkoutRoute,
  orderConfirmationRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
