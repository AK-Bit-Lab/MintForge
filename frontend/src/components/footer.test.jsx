import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Footer } from './Footer'

describe('Footer', () => {
  it('labels the legal attribution row and brand description title metadata', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))

      expect(markup).toContain('aria-label="Footer legal and attribution"')
      expect(markup).toContain('title="Wallet-first NFT minting experience on Stacks"')
    })

  it('renders labeled link navigation groups and footer landmark label', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))

      expect(markup).toContain('aria-label="Site footer"')
      expect(markup).toContain('id="footer-project-links-heading"')
      expect(markup).toContain('id="footer-community-links-heading"')
      expect(markup).toContain('id="footer-resource-links-heading"')
      expect(markup).toContain('data-column-count="3"')
      expect(markup).toContain('data-link-count="3"')
      expect(markup).toContain('data-link-count="5"')
    })

  it('includes a direct SIP-009 standard reference link', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain('sip009')
    })

  it('uses noopener noreferrer on external footer links', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain('rel="noopener noreferrer"')
    })

  it('configures external links to open in new tabs', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain('target="_blank"')
    })

  it('renders the MintForge brand title in footer branding', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain('MintForge')
    })

  it('renders closing build credit copy', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain('Built for Stacks NFT collections')
    })

  it('includes an explorer link for the tracked core contract', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain('Core Contract')
      expect(markup).toContain('https://explorer.hiro.so/address/SP2KK5E7D3NFTSDMSJ7SFK99YY68194E3J2H6TT96.minimint-core-v-i28?chain=mainnet')
    })

  it('shows the current year in copyright copy', () => {
      const year = new Date().getFullYear()
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain(`© ${year}`)
    })

  it('includes an explorer link for the tracked hub contract', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain('Hub Contract')
      expect(markup).toContain('https://explorer.hiro.so/address/SP2KK5E7D3NFTSDMSJ7SFK99YY68194E3J2H6TT96.minimint-hub-v-i28?chain=mainnet')
    })

  it('includes the IPFS docs link in project resources', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain('https://docs.ipfs.tech/')
    })

  it('includes a Hiro explorer link scoped to the configured chain', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain('https://explorer.hiro.so/?chain=mainnet')
    })

  it('renders the project, community, and resources headings', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain('Project')
      expect(markup).toContain('Community')
      expect(markup).toContain('Resources')
    })

  it('includes the Stacks Discord community link', () => {
      const markup = renderToStaticMarkup(React.createElement(Footer))
      expect(markup).toContain('https://discord.gg/stacks')
    })
})
