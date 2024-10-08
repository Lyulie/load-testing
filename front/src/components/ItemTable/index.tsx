import React, { useEffect, useState } from 'react';

interface Item {
    id: number;
    name: string;
}

const ItemTable: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8000/items');
        eventSource.onmessage = (event) => {
            const newItem: Item = JSON.parse(event.data);
            setItems((prevItems) => {
                // Verifica se o item já está na lista antes de adicioná-lo
                if (!prevItems.some(item => item.id === newItem.id)) {
                    return [...prevItems, newItem];
                }
                return prevItems;
            });
        };
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ItemTable;