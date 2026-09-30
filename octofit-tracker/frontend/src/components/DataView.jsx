import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/api.js'

export function DataView({ children, component, emptyMessage, renderItem, title }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadItems() {
      try {
        setStatus('loading')
        setError('')
        const nextItems = await fetchCollection(component)

        if (!ignore) {
          setItems(nextItems)
          setStatus('ready')
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load data')
          setStatus('error')
        }
      }
    }

    loadItems()

    return () => {
      ignore = true
    }
  }, [component])

  return (
    <section className="data-view">
      <div className="view-heading">
        <div>
          <p className="eyebrow">OctoFit data</p>
          <h1>{title}</h1>
        </div>
        {children}
      </div>

      {status === 'loading' && <p className="state-message">Loading {title.toLowerCase()}...</p>}
      {status === 'error' && <p className="state-message error">{error}</p>}
      {status === 'ready' && items.length === 0 && <p className="state-message">{emptyMessage}</p>}

      {status === 'ready' && items.length > 0 && (
        <div className="data-grid">
          {items.map((item) => (
            <article className="data-card" key={item._id ?? item.id ?? JSON.stringify(item)}>
              {renderItem(item)}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}