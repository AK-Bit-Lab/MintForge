import { describe, expect, it } from 'vitest'
import {
  Badge,
  BadgeDefault,
  Card,
  CardDefault,
  CopyButton,
  CopyButtonDefault,
  Footer,
  FooterDefault,
  Gallery,
  GalleryDefault,
  Header,
  HeaderDefault,
  LoadingSkeletonDefault,
  MintCard,
  MintCardDefault,
  Modal,
  ModalDefault,
  ProgressBar,
  ProgressBarDefault,
  RecentMints,
  RecentMintsDefault,
  Spinner,
  SpinnerDefault,
  Stats,
  StatsDefault,
  Toast,
  ToastDefault,
  Tooltip,
  TooltipDefault
} from './index'
import Header, { Header as HeaderComponent } from './Header'
import MintCard, { MintCard as MintCardComponent } from './MintCard'
import Stats, { Stats as StatsComponent } from './Stats'
import RecentMints, { RecentMints as RecentMintsComponent } from './RecentMints'
import Footer, { Footer as FooterComponent } from './Footer'
import Gallery, { Gallery as GalleryComponent } from './Gallery'
import Toast, { Toast as ToastComponent } from './Toast'
import Tooltip, { Tooltip as TooltipComponent } from './Tooltip'
import Modal, { Modal as ModalComponent } from './Modal'
import ProgressBar, { ProgressBar as ProgressBarComponent } from './ProgressBar'
import Spinner, { Spinner as SpinnerComponent } from './Spinner'
import LoadingSkeleton from './LoadingSkeleton'
import CopyButton, { CopyButton as CopyButtonComponent } from './CopyButton'
import Badge, { Badge as BadgeComponent } from './Badge'
import Card, { Card as CardComponent } from './Card'

describe('components barrel default exports', () => {
  it('maps default aliases to each source component module', () => {
      expect(HeaderDefault).toBe(Header)
      expect(MintCardDefault).toBe(MintCard)
      expect(StatsDefault).toBe(Stats)
      expect(RecentMintsDefault).toBe(RecentMints)
      expect(FooterDefault).toBe(Footer)
      expect(GalleryDefault).toBe(Gallery)
      expect(ToastDefault).toBe(Toast)
      expect(TooltipDefault).toBe(Tooltip)
      expect(ModalDefault).toBe(Modal)
      expect(ProgressBarDefault).toBe(ProgressBar)
      expect(SpinnerDefault).toBe(Spinner)
      expect(LoadingSkeletonDefault).toBe(LoadingSkeleton)
      expect(CopyButtonDefault).toBe(CopyButton)
      expect(BadgeDefault).toBe(Badge)
      expect(CardDefault).toBe(Card)
    })
})

describe('components barrel named exports', () => {
  it('maps named exports to their source component modules', () => {
      expect(Header).toBe(HeaderComponent)
      expect(MintCard).toBe(MintCardComponent)
      expect(Stats).toBe(StatsComponent)
      expect(RecentMints).toBe(RecentMintsComponent)
      expect(Footer).toBe(FooterComponent)
      expect(Gallery).toBe(GalleryComponent)
      expect(Toast).toBe(ToastComponent)
      expect(Tooltip).toBe(TooltipComponent)
      expect(Modal).toBe(ModalComponent)
      expect(ProgressBar).toBe(ProgressBarComponent)
      expect(Spinner).toBe(SpinnerComponent)
      expect(CopyButton).toBe(CopyButtonComponent)
      expect(Badge).toBe(BadgeComponent)
      expect(Card).toBe(CardComponent)
    })
})

