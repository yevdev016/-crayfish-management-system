import { useState } from 'react'
import HabitatsHeader from '@/components/habitats/HabitatsHeader'
import HabitatList from '@/components/habitats/HabitatList'
import HabitatForm from '@/components/habitats/HabitatForm'
import DeleteConfirm from '@/components/habitats/DeleteConfirm'
import LoadingModal from '@/components/ui/LoadingModal'
import useHabitats from '@/hooks/useHabitats'

const Habitats = () => {
    const { habitats, addHabitat, updateHabitat, deleteHabitat } = useHabitats()
    const [showForm, setShowForm] = useState(false)
    const [editingHabitat, setEditingHabitat] = useState(null)
    const [deletingHabitat, setDeletingHabitat] = useState(null)
    const [saving, setSaving] = useState(false)

    const handleAdd = () => {
        setEditingHabitat(null)
        setShowForm(true)
    }

    const handleEdit = (habitat) => {
        setEditingHabitat(habitat)
        setShowForm(true)
    }

    const handleSave = async (data) => {
        setSaving(true)
        try {
            if (editingHabitat) {
               await updateHabitat(editingHabitat.id, data)
            } else {
               await addHabitat(data)
            }
            setShowForm(false)
            setEditingHabitat(null)
        } catch(err){
            console.error(err)
            alert(err.response?.data?.message || 'Failed to save habitat')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = (habitat) => {
        setDeletingHabitat(habitat)
    }

    const handleDeleteConfirm = async(id) => {
        setSaving(true)
        try {
           await deleteHabitat(id)
            setDeletingHabitat(null)
        } catch(err){
            console.error(err)
            alert(err.response?.data?.message || 'Failed to delete habitat')
        } finally {
            setSaving(false)
        }
    }

    return (
        <>
            <HabitatsHeader onAddClick={handleAdd} />
            <HabitatList habitats={habitats} onEdit={handleEdit} onDelete={handleDelete} />

            {showForm && (
                <HabitatForm
                    habitat={editingHabitat}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditingHabitat(null) }}
                />
            )}

            {deletingHabitat && (
                <DeleteConfirm
                    item={deletingHabitat}
                    title="Habitat"
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeletingHabitat(null)}
                />
            )}

            {saving && <LoadingModal message={editingHabitat ? 'Updating habitat...' : 'Creating habitat...'} />}
        </>
    )
}

export default Habitats
