/**
 * Hooks barrel export file.
 * 
 * Centralizes all custom hook exports for clean imports
 * throughout the application.
 */
export { useTheme } from '../context/ThemeContext'
export { useStacksWallet as useWallet } from './useStacksWallet'
export { useStacksContract as useContract } from './useStacksContract'
export { useToast } from './useToast'
export { useLocalStorage, useSessionStorage } from './useStorage'
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsLargeDesktop,
  useHighContrast,
  usePrefersDarkMode,
  usePrefersReducedMotion,
  useIsLandscape,
  useIsPortrait,
  useIsTouchDevice
} from './useMediaQuery'
export { useTransactionStatus } from './useTransaction'
export { useClipboard } from './useClipboard'
export { useAsync } from './useAsync'
export { useScrollPosition } from './useScrollPosition'
export { usePrevious } from './usePrevious'
export { useDebounce } from './useDebounce'
export { useEventListener } from './useEventListener'
export { useIsVisible } from './useIsVisible'
export { useFocusTrap } from './useFocusTrap'
export { useNetworkStatus } from './useNetworkStatus'
export { useConfirm } from './useConfirm'
export { useTimeout } from './useTimeout'
export { useCounter } from './useCounter'
export { useInterval } from './useInterval'
export { useIdle } from './useIdle'
export { useHover } from './useHover'

/**
 * Default exports for individual hooks.
 */
export { default as useWalletDefault } from './useStacksWallet'
export { default as useContractDefault } from './useStacksContract'
export { default as useToastDefault } from './useToast'
export { default as useStorageDefault } from './useStorage'
export { default as useMediaQueryDefault } from './useMediaQuery'
export { default as useTransactionDefault } from './useTransaction'
export { default as useClipboardDefault } from './useClipboard'
export { default as useAsyncDefault } from './useAsync'
