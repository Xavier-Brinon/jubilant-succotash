import * as React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/start'
import { createRouter } from './router.tsx'

const router = createRouter()

hydrateRoot(document.getElementById('root')!, <StartClient router={router} />)
